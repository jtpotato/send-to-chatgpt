import { HfInference } from '@huggingface/inference'

const hf = new HfInference('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')

export function summarisePage() {
    const pageText = document.body.innerText;
    console.log(pageText)
}