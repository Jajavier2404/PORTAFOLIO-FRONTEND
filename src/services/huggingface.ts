const HUGGINGFACE_API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY || '';
const HUGGINGFACE_API_URL = 'https://api-inference.huggingface.co/models/';

// Modelo recomendado para chat en español
const DEFAULT_MODEL = 'microsoft/DialoGPT-medium';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const huggingFaceService = {
  async sendMessage(message: string, history: ChatMessage[] = []): Promise<string> {
    try {
      // Si no hay API key configurada, usamos respuestas simuladas
      if (!HUGGINGFACE_API_KEY) {
        return simulateResponse(message);
      }

      const response = await fetch(`${HUGGINGFACE_API_URL}${DEFAULT_MODEL}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: {
            text: message,
            past_user_inputs: history
              .filter(m => m.role === 'user')
              .map(m => m.content),
            generated_responses: history
              .filter(m => m.role === 'assistant')
              .map(m => m.content),
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // La respuesta puede variar según el modelo
      if (Array.isArray(data) && data[0]?.generated_text) {
        return data[0].generated_text;
      }

      return data.generated_text || 'Lo siento, no pude procesar tu mensaje.';
    } catch (error) {
      console.error('Error calling Hugging Face API:', error);
      return simulateResponse(message);
    }
  }
};

// Función para simular respuestas cuando no hay API key
function simulateResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  const responses = [
    {
      keywords: ['hola', 'buenas', 'hey', 'saludos'],
      response: '¡Hola! ¿Cómo estás? Soy el asistente virtual de Javier. ¿En qué puedo ayudarte hoy?'
    },
    {
      keywords: ['proyecto', 'proyectos', 'trabajo', 'portfolio'],
      response: 'Javier ha trabajado en varios proyectos interesantes. Tiene experiencia en desarrollo web, microservicios e integración con IA. ¿Te gustaría saber más sobre algún proyecto específico?'
    },
    {
      keywords: ['tecnología', 'tech', 'stack', 'tecnologías'],
      response: 'Javier domina tecnologías como React, TypeScript, Node.js, Python, y está explorando el mundo de la IA y los microservicios. ¿Hay alguna tecnología específica que te interese?'
    },
    {
      keywords: ['contacto', 'email', 'correo', 'hablar'],
      response: 'Puedes contactar a Javier a través del formulario de contacto en su portafolio o enviarle un email a javialex2008@gmail.com. ¡Está siempre abierto a nuevas oportunidades!'
    },
    {
      keywords: ['experiencia', 'cv', 'currículum', 'trabajo'],
      response: 'Javier es estudiante de Ingeniería de Software y ha trabajado en proyectos freelance. Tiene experiencia en desarrollo full-stack, arquitectura de software e integración de APIs.'
    },
    {
      keywords: ['ia', 'inteligencia artificial', 'ai', 'chatbot'],
      response: '¡Excelente pregunta! Javier está muy interesado en la IA. Este mismo chat es un ejemplo de su trabajo con modelos de lenguaje. Ha trabajado con Hugging Face, OpenAI y está explorando MCP (Model Context Protocol).'
    }
  ];

  // Buscar respuesta relevante
  for (const item of responses) {
    if (item.keywords.some(keyword => lowerMessage.includes(keyword))) {
      return item.response;
    }
  }

  // Respuestas genéricas
  const genericResponses = [
    'Eso suena interesante. ¿Podrías contarme más sobre ello?',
    'Entiendo. Javier también ha trabajado en proyectos similares.',
    '¡Qué buena pregunta! Déjame pensar... Javier definitivamente podría ayudarte con eso.',
    'Me parece genial. ¿Hay algo más específico sobre lo que te gustaría saber?',
    'Javier siempre está aprendiendo cosas nuevas. Ese es un tema que le apasiona.'
  ];

  return genericResponses[Math.floor(Math.random() * genericResponses.length)];
}
