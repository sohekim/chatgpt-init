import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [emailPromptInput, setemailPromptInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailPrompt: emailPromptInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setemailPromptInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Email GPT</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="emailPrompt"
            placeholder="Enter your email prompt."
            value={emailPromptInput}
            onChange={(e) => setemailPromptInput(e.target.value)}
          />
          {/* <input
            type="text"
            name="emailPrompt"
            placeholder="Enter your emailPrompt prompt"
            value={emailPromptInput}
            onChange={(e) => setemailPromptInput(e.target.value)}
          /> */}
          <input type="submit" value="Generate email" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
