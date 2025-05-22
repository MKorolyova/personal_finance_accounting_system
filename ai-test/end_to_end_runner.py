import os
import asyncio
from dotenv import load_dotenv

from browser_use import Browser, Agent
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()

llm_gemini = ChatGoogleGenerativeAI(
    model="models/gemini-2.0-flash",
    google_api_key=os.getenv("GOOGLE_API_KEY"),
    temperature=0.7
)

PROMPT = """
You are an agent interacting with a personal finance web app.

1. Open http://localhost:4000
2. Click the "Log In" button
3. Enter the following credentials:
   - Email: test@test.com
   - Password: test
4. Click "Log In"
5. Click the "Add Transaction" button to open the transaction modal window.
6. In the modal:
   - Set Amount to 123
   - Choose Type: expense
   - Choose Category: taxi
   - Set Description: test entry
7. Then, scroll down inside the New Transaction form until the date picker and the "Add" button are visible.
8. Select today date.
9. Click the "Add" button to save the transaction.
10. Wait for 5 second
"""


async def main():

    browser = Browser()

    agent = Agent(
        task=PROMPT,
        llm=llm_gemini,
        browser=browser,
        generate_gif=True,
        use_vision=True,
    )

    await agent.run()
    input("Click Enter to finish...")
    await browser.close()


if __name__ == "__main__":
    asyncio.run(main())
