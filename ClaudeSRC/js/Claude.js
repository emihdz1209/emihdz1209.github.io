import { key } from "./config";

async function Inquiry(prompt) {

    const requestBody = {
        model: "claude-3-sonnet-1",
        max_tokens: 100,
        messages: [
            {
                role: "user",
                content: prompt
            }
        ]
    }

    const apiURL = "https://api.anthropic.com/v1/messages";

    const respuesta = await fetch(apiURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "anthropic-version" : "2023-06-01",
            "x-api-key": key,
            "anthropic-dangerous-direct-browser-access": "true"
        },
        body: JSON.stringify(requestBody)});

    const respuestaJSON = await respuesta.json();
    console.log(respuestaJSON.content);

    
}

console.log(key);

