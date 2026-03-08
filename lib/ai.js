export async function callAI(messages, imageBase64 = null) {
  const API_KEY = process.env.OPENROUTER_API_KEY;
  const MODEL = process.env.MODEL_NAME;

  let finalMessages = [...messages];

  if (imageBase64) {
    finalMessages.push({
      role: "user",
      content: [
        {
          type: "text",
          text: "Is screenshot ko analyze karo aur batao isme kya hai?"
        },
        {
          type: "image_url",
          image_url: {
            url: `data:image/jpeg;base64,${imageBase64}`
          }
        }
      ]
    });
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: MODEL,
      messages: finalMessages
    })
  });

  const data = await response.json();
  return data.choices[0].message.content;
}
