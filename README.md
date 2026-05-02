# ElectionEd - Election Process Education Assistant

ElectionEd is an interactive web application that helps users understand how elections work in a clear, step-by-step, conversational way. It leverages modern web technologies and AI to provide tailored electoral system content, specifically targeting a streamlined, accessible educational experience.

## Chosen Vertical
**Election Process Education Assistant**
We chose this vertical to tackle the complexity of civic education. Many citizens find electoral processes daunting. This assistant demystifies voting procedures, eligibility, and election timelines using an interactive, gamified, and AI-assisted approach.

## Approach and Logic
Our approach is centered on making civic education **interactive**, **personalized**, and **accessible**.
- **Contextual Adaptation**: The platform tailors content based on the selected country (e.g., US, India).
- **Progressive Disclosure**: We use an interactive election roadmap to break down complex timelines into digestible phases (pre-election, campaign, voting, post-election).
- **Gamification**: Interactive quizzes at the end of each phase to test and reinforce knowledge.
- **AI-Driven Personalization**: Integration of the Google Gemini API acts as a "VoteGuide AI assistant" to explain concepts on-the-fly, adapting to different proficiency levels (Simple, Standard, Expert) and guiding users through specific processes like using EVMs and VVPATs.

## How the Solution Works
- **Frontend**: Built with Next.js (App Router), React, and Tailwind CSS. The UI is designed to be highly responsive and engaging, utilizing Framer Motion for smooth animations and micro-interactions.
- **State Management**: Uses React Context and LocalStorage to track user progress through quizzes and reading materials.
- **AI Integration**: The backend uses Next.js Route Handlers coupled with the `@ai-sdk/google` to securely communicate with the Gemini 2.5 Pro model. The AI acts as a dedicated ElectionEd Assistant, streaming clear, step-by-step explanations directly to the user's interface.
- **Dynamic Content**: Static data for country-specific processes is managed via structured JSON files, making the platform easily extensible.

## Assumptions Made
- Users have basic internet connectivity and use a modern web browser.
- Election laws and procedures are based on general federal/national guidelines, and local state/municipal nuances may require further specific resources.
- The user is seeking a high-level educational overview rather than legally binding advice.
- Users are capable of reading simple instructions and have a basic understanding of using conversational AI interfaces.

## Tech Stack
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & shadcn/ui
- **Animations**: Framer Motion & canvas-confetti
- **AI**: Google Gemini API via Vercel AI SDK

## Getting Started

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <your-repo-link>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add your Google Gemini API key:
   ```env
   GOOGLE_GENERATIVE_AI_API_KEY=your_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the app:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.
