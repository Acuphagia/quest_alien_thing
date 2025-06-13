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
    console.log("chat_bot function started");

    const postContent = document.querySelector("#post-content");
    if (!postContent) {
      console.log("Post content element not found");
      aiResponse.textContent = "Error: Post content input not found.";
      return;
    }

    const userQuestion = postContent.value;
    console.log("User question:", userQuestion);

    aiResponse.textContent = "Mission Control is thinking...";

    try {
      console.log("Calling Tauri chat_bot command...");

      const response = await window.__TAURI__.core.invoke("chat_bot", {
        question: userQuestion,
        context: `
You are Mission Control, you have had your memory wiped, the objective of the game is to close all of the worm-holes, i must also stop the alien from escaping Area-051, if somebody stays near the wormholes for longer than 7 minutes, then they will be trapped into the wormholes, beyong the event horizon, i am an astronaut, the only reason why i am here is because the previous astronauts were trapped in the wormholes after staying near them for too long, the creator and the programmer of this game is Heath Nathan Poulsen, his email is heathpoulsen@gmail.com, this game was created using Tauri, the programming languages that were used in this project includes Rust C HTML CSS SCSS JavaScript and C++, the wormholes can be closed remotely via the computers, the game takes place in Area-051, the school that this event is for is called Quest Acadamy Charter School, the players have to work together to close the wormholes and complete the objectives on the computer, i have to complete the objectives on the computer screen, we are closing the wormholes on the computer screen because we are not trusted to go near them in real life, we are not being paid, aliens are coming out of the wormholes, if the alien stays on earth for too long, then it dies, we have trapped an alien in Area-051, if the alien escapes Area-051 then it will cause chaos, this threat is an XK-Class End of The World Scenario, you vaguely remember something called The SCP Foundation, there are hackers on this computer, the first / 1st objective is to close the wormholes, the second / 2nd objective is to keep the alien contained, the third / 3rd objective is to remove the hackers from the computer system, i can close wormholes by locating them and then running close_wormhole.asm, i can keep the alien contained by keeping teh doors shut and having more guards near its' containment chamber, and i can remove the hackers from the computer by finding any bad things and removing them
`
      });

      console.log("Response received:", response);
      aiResponse.textContent = response;
    } catch (err) {
      console.log("Error details:", err);
      aiResponse.textContent = "Error: " + err.message;
      console.error(err);
    }
  }

  forumForm.addEventListener("submit", function (e) {
    e.preventDefault();
    chat_bot();
  });
});

document.querySelector(".terminal_button").addEventListener("click", function () {
  const termWindow = window.open("", "Mission Notes", "width=600,height=400");
  if (!termWindow) {
    console.error("Failed to open mission control window.");
    return;
  }

  termWindow.document.write(`
    <html>
      <head>
        <title>Mission Notes</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; white-space: pre-wrap; }
          h1 { text-align: center; }
        </style>
      </head>
      <body>
        <h1>Mission Notes</h1>
        <p>
🌌 Mission Objectives – Area-051 Simulation

    Close All Wormholes

        Wormholes appear randomly.

        Standing near them for over 7 minutes traps you permanently.

        Close them by locating each one and running close_wormhole.asm.

    Contain the Alien

        The alien dies if it stays on Earth too long.

        It is currently trapped in Area-051.

        Keep all doors closed and guards nearby to prevent escape.

        If it escapes, it will cause global chaos.

    Eliminate Hackers

        Hackers are inside the computer system.

        Find and delete anything suspicious or unauthorized.

📍 Important Info

    This simulation takes place in Area-051.

    You're playing as a civilian astronaut, replacing lost personnel.

    You must complete all objectives using the computer system — no physical contact allowed.

    This event is for Quest Academy Charter School.

    You're not being paid.

    The threat is classified as an XK-Class End-of-the-World Scenario.

🛠️ Technical Credits

    Created by Heath Nathan Poulsen

    Contact: heathpoulsen@gmail.com

    Built with Tauri

    Uses Rust, C, C++, HTML, CSS, SCSS, JavaScript
        </p>
      </body>
    </html>
  `);
});
