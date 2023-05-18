import { HfInference } from "@huggingface/inference";

const hf = new HfInference("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");

export function summarisePage() {
  const pageText = document.body.innerText;
  hf.summarization({
    model: "facebook/bart-large-cnn",
    inputs: pageText,
    parameters: {
      max_length: 200,
    },
  }).then((output) => {
    console.log(output);
  });
}
