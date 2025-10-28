// AI Service - Handles both online and offline AI inference
import axios from 'axios';
import { initLlama, convertJsonSchemaToGrammar, } from 'llama.rn';

export class AIService {
  constructor() {
    this.mode = 'online'; // 'online' or 'offline'
    this.apiKey = null;
    this.llamaContext = null;
    this.promptCache = new Map(); // Cache processed prompts
    this.lastPrompt = null; // Track last prompt for caching
  }

  setMode(mode) {
    this.mode = mode;
  }

  setApiKey(key) {
    this.apiKey = key;
  }

  async generateResponse(messages, onChunk = null) {
    if (this.mode === 'online') {
      return await this.generateOnline(messages, onChunk);
    } else {
      return await this.generateOffline(messages, onChunk);
    }
  }

  // Online mode using Groq API (free, fast)
  async generateOnline(messages, onChunk) {
    try {
      console.log('API Key check:', this.apiKey ? `Key present (${this.apiKey.length} chars)` : 'No key');
      
      // Format messages for API
      const formattedMessages = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      // Add system message
      formattedMessages.unshift({
        role: 'system',
        content: 'You are a helpful AI assistant. Be concise and friendly.'
      });

      // Using Groq API - non-streaming for React Native compatibility
      const response = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'llama-3.3-70b-versatile',
          messages: formattedMessages,
          temperature: 0.7,
          max_tokens: 1024,
          stream: false
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey || 'gsk_demo_key'}`,
            'Content-Type': 'application/json'
          },
          timeout: 30000
        }
      );

      if (response.data?.choices?.[0]?.message?.content) {
        const fullText = response.data.choices[0].message.content;
        
        // Simulate streaming effect by sending text word by word
        if (onChunk) {
          const words = fullText.split(' ');
          for (let i = 0; i < words.length; i++) {
            const word = words[i] + (i < words.length - 1 ? ' ' : '');
            onChunk(word);
            // Small delay to create streaming effect
            await new Promise(resolve => setTimeout(resolve, 30));
          }
        }
        
        return {
          success: true,
          text: fullText,
          mode: 'online'
        };
      } else {
        throw new Error('Invalid response format');
      }

    } catch (error) {
      console.error('Online AI error:', error);
      console.error('Error details:', error.response?.data);
      console.error('Status:', error.response?.status);
      
      // Fallback to demo mode if API fails
      if (error.response?.status === 401) {
        return {
          success: false,
          error: 'Invalid API key. Please check your Groq API key in settings.',
          text: this.getDemoResponse(messages),
          mode: 'demo'
        };
      }
      
      if (error.response?.status === 400) {
        return {
          success: false,
          error: `Bad request: ${error.response?.data?.error?.message || 'Check your API key and try again.'}`,
          text: this.getDemoResponse(messages),
          mode: 'demo'
        };
      }
      
      return {
        success: false,
        error: error.message,
        text: this.getDemoResponse(messages),
        mode: 'demo'
      };
    }
  }

  // Offline mode using local model
  async generateOffline(messages, onChunk) {
    try {
      // Check if model is loaded
      if (!this.llamaContext) {
        throw new Error('Local model not loaded. Please download the model first or switch to online mode.');
      }

      // Build optimized prompt from conversation history (keep only recent messages)
      const prompt = this.buildPrompt(messages);

      // Generate response using llama.cpp via llama.rn with optimized settings
      const response = await this.llamaContext.completion(
        {
          prompt: prompt,
          n_predict: 200,        // Further reduced for even faster responses
          temperature: 0.5,      // Lower for more deterministic, faster responses
          top_k: 20,             // Further reduced for faster sampling
          top_p: 0.8,            // Tighter distribution for speed
          repeat_penalty: 1.15,  // Higher penalty to reduce repetition faster
          stop: ['<|im_end|>', '<|im_start|>', '\n\nUser:', '\n\nHuman:', 'User:', 'Human:'],
          n_threads: 8,          // Maximized threads for modern phones
          min_p: 0.05,           // Min probability threshold for faster pruning
          tfs_z: 1.0,            // Tail-free sampling for quality/speed balance
          typical_p: 1.0,        // Typical sampling disabled for max speed
          penalty_last_n: 64,    // Only penalize last 64 tokens (faster)
          mirostat: 0,           // Disable mirostat for speed
        },
        (data) => {
          // Stream token-by-token for real-time feedback
          if (onChunk && data.token) {
            onChunk(data.token);
          }
        }
      );
      
      return {
        success: true,
        text: response.text.trim(),
        mode: 'offline'
      };

    } catch (error) {
      console.error('Offline AI error:', error);
      return {
        success: false,
        error: error.message,
        text: `Error running offline AI: ${error.message}\n\nMake sure:\n1. Model is downloaded\n2. App has enough memory (close other apps)\n3. Try restarting the app`,
        mode: 'offline'
      };
    }
  }

  buildPrompt(messages) {
    // Dolphin X1 8B uses ChatML format
    // Simplified system prompt for faster processing
    let prompt = '<|im_start|>system\nYou are a helpful AI. Be concise.<|im_end|>\n';
    
    // Only use last 6 messages (3 exchanges) to minimize context
    const recentMessages = messages.slice(-6);
    
    recentMessages.forEach((msg) => {
      if (msg.sender === 'user') {
        prompt += `<|im_start|>user\n${msg.text}<|im_end|>\n`;
      } else if (msg.sender === 'ai') {
        prompt += `<|im_start|>assistant\n${msg.text}<|im_end|>\n`;
      }
    });
    
    // Add the assistant prompt to trigger response
    prompt += '<|im_start|>assistant\n';
    
    return prompt;
  }

  getDemoResponse(messages) {
    const lastMessage = messages[messages.length - 1]?.text.toLowerCase() || '';
    
    // Simple pattern matching for demo
    if (lastMessage.includes('hello') || lastMessage.includes('hi')) {
      return "Hello! I'm currently in demo mode. For real AI responses, please add a Groq API key in settings or wait for offline model integration.";
    } else if (lastMessage.includes('how are you')) {
      return "I'm doing well, thank you! I'm running in demo mode. To get actual AI responses, switch to online mode and add an API key in settings.";
    } else if (lastMessage.includes('help')) {
      return "I can help you with various tasks! Right now I'm in demo mode. For full AI capabilities:\n\n• Online Mode: Add Groq API key (free at groq.com)\n• Offline Mode: Coming soon with native integration";
    } else {
      return `I received your message: "${messages[messages.length - 1]?.text}"\n\nCurrently in demo mode. For real AI responses:\n\n✓ Switch to Online Mode\n✓ Add API key in Settings\n✓ Or wait for offline model support`;
    }
  }

  async loadLocalModel(modelPath) {
    try {
      console.log('Loading model from:', modelPath);
      
      // Initialize llama.cpp context with GPU acceleration enabled
      const context = await initLlama({
        model: modelPath,
        n_ctx: 768,         // Further reduced context for maximum speed
        n_batch: 128,       // Smaller batch for instant first token
        n_threads: 8,       // Maximum threads for parallel processing
        use_mlock: true,    // Keep model in RAM for fastest inference
        n_gpu_layers: 99,   // Offload ALL layers to GPU (Metal on iOS, Vulkan on Android)
        embedding: false,   // Disable embeddings (not needed)
        use_mmap: true,     // Memory-map for efficient loading
        lora_adapters: [],  // No LoRA adapters for speed
        vocab_only: false,
        seed: -1,           // Random seed for variety
        f16_kv: true,       // Use FP16 for key/value cache (faster)
        logits_all: false,  // Only compute logits for next token
        cache_type_k: 'f16', // FP16 cache for speed
        cache_type_v: 'f16',
      });
      
      this.llamaContext = context;
      
      // Warm up the model with a tiny inference (primes the cache)
      try {
        await context.completion({
          prompt: '<|im_start|>user\nHi<|im_end|>\n<|im_start|>assistant\n',
          n_predict: 5,
          temperature: 0.5,
        });
        console.log('Model warmed up successfully');
      } catch (warmupError) {
        console.log('Warmup failed, but model loaded:', warmupError.message);
      }
      
      return {
        success: true,
        message: 'Model loaded and optimized for speed!'
      };
    } catch (error) {
      console.error('Error loading model:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
  
  async releaseModel() {
    if (this.llamaContext) {
      try {
        await this.llamaContext.release();
        this.llamaContext = null;
        this.promptCache.clear(); // Clear cache on release
        this.lastPrompt = null;
        return { success: true };
      } catch (error) {
        console.error('Error releasing model:', error);
        return { success: false, error: error.message };
      }
    }
    return { success: true };
  }
}

export default AIService;
