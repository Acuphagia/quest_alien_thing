import { invoke } from "@tauri-apps/api";
import { readTextFile, BaseDirectory } from "@tauri-apps/api/fs";

let aiResponse;

window.addEventListener("DOMContentLoaded", async () => {
  aiResponse = document.querySelector("#ai-response");
  const forumForm = document.querySelector("#forum-form");

  if (!aiResponse) {
    console.error("Element with id 'ai-response' not found.");
    return;
  }
  if (!forumForm) {
    console.error("Element with id 'forum-form' not found.");
    return;
  }

  async function chat_bot() {
    const postContent = document.querySelector("#post-content");
    if (!postContent) {
      aiResponse.textContent = "Error: Post content input not found.";
      return;
    }
    const userQuestion = postContent.value;

    try {
      const context = await readTextFile("training_data.txt", {
        dir: BaseDirectory.Resource
      });

      const response = await invoke("chat_bot", {
        question: userQuestion,
        context: context
      });

      aiResponse.textContent = response;
    } catch (err) {
      aiResponse.textContent = "Error: " + err.message;
      console.error(err);
    }
  }

  forumForm.addEventListener("submit", function (e) {
    e.preventDefault();
    chat_bot();
  });
});
