export interface ApplicationQuestion {
  id: number;
  question: string;
  type: 'text' | 'textarea' | 'choice';
  placeholder?: string;
  options?: string[];
  category: 'Eligibility' | 'Experience' | 'Scenarios' | 'Dedication';
  minWords?: number;
}

export const STAFF_APP_QUESTIONS: ApplicationQuestion[] = [
  { id: 1, question: 'What is your Roblox username and numeric User ID?', type: 'text', placeholder: 'e.g., ronaldoiscat (2056966914)', category: 'Eligibility' },
  { id: 2, question: 'Are you 13 years of age or older?', type: 'choice', options: ['Yes, I am 13 or older', 'No, I am under 13'], category: 'Eligibility' },
  { id: 3, question: 'What is your current Timezone and approximate daily active hours on Discord?', type: 'text', placeholder: 'e.g., EST (UTC-5), 4-6 hours daily', category: 'Eligibility' },
  { id: 4, question: 'Do you have a working microphone and the ability to join Discord voice channels for staff meetings?', type: 'choice', options: ['Yes, verified working mic', 'Yes, but listening only', 'No microphone'], category: 'Eligibility' },
  { id: 5, question: 'Have you ever served as staff in any Roblox ER:LC, FiveM, or roleplay community? If so, list your past ranks and communities.', type: 'textarea', placeholder: 'Detail past leadership, moderation experience, and references...', category: 'Experience', minWords: 20 },
  { id: 6, question: 'Why do you want to join our Staff Team over any other server?', type: 'textarea', placeholder: 'Explain your motivation, vision, and how you will uphold standards...', category: 'Dedication', minWords: 30 },
  { id: 7, question: 'What makes you stand out from other applicants applying for Trainee?', type: 'textarea', placeholder: 'Highlight your qualities: patience, activity, integrity, composure...', category: 'Dedication', minWords: 25 },
  { id: 8, question: 'Scenario: You witness a high-ranking staff member abusing mod commands or breaking server rules in-game. How do you respond?', type: 'textarea', placeholder: 'Walk through gathering evidence, reporting to Internal Affairs...', category: 'Scenarios', minWords: 30 },
  { id: 9, question: 'Scenario: A member is constantly arguing with you in a support ticket, using offensive remarks and claiming you are corrupt. What steps do you take?', type: 'textarea', placeholder: 'Describe de-escalation, remaining professional, warning, and escalating...', category: 'Scenarios', minWords: 30 },
  { id: 10, question: 'Scenario: Two players in-game accuse each other of RDM (Random Deathmatch) and Fail Roleplay with no video proof provided. How do you handle it?', type: 'textarea', placeholder: 'Explain checking kill logs, interviewing both parties calmly...', category: 'Scenarios', minWords: 25 },
  { id: 11, question: 'Define "Fail Roleplay" and "Fear Roleplay" in your own words, providing one realistic example for each.', type: 'textarea', placeholder: 'Explain both concepts clearly with practical in-game examples...', category: 'Experience', minWords: 35 },
  { id: 12, question: 'If you are assigned to complete your staff training within 7 days, how will you ensure you attend and graduate on time?', type: 'textarea', placeholder: 'Detail your commitment to watching training announcements and attending...', category: 'Dedication', minWords: 20 },
  { id: 13, question: 'Are you currently holding a staff position in another active ER:LC roleplay community?', type: 'choice', options: ['No, I am fully dedicated to this server', 'Yes, but I have dual-duty permission', 'Yes, but I will resign if accepted'], category: 'Eligibility' },
  { id: 14, question: 'Do you acknowledge that leaking staff channels, trolling, or submitting false information results in a permanent blacklist?', type: 'choice', options: ['I understand and agree fully', 'I disagree'], category: 'Eligibility' },
  { id: 15, question: 'Final statement: Is there anything else the High-Ranking team should know about your application?', type: 'textarea', placeholder: 'Any additional skills, certifications, bot experience, or comments...', category: 'Dedication', minWords: 15 },
];

export const ACCEPTANCE_TEMPLATE = {
  title: 'Results — Application Approved! 🎉',
  color: 0x22c55e,
  body: `We would like to congratulate you on passing your application and becoming a **Trainee** within our server. Your dedication throughout your application has stood out to us, and has earned you a place in our community!\n\nPlease be on the lookout in our **training category** for updates and training sessions from our training team, and feel free to ask any questions you may have.\n\nOnce again, congratulations, and welcome to the team!`,
};

export const REJECTION_TEMPLATE = {
  title: 'Results — Application Decision',
  color: 0xef4444,
  body: `On behalf of the high rank team, we are sad to have had to decline your application. We appreciate all that you have put forward into applying for this position, but unfortunately it did not meet our set standards.\n\nWe apologize for this, and we wish you luck if you do want to try again in the future! Thank you again for applying and finding interest in joining our team, and apologies.`,
};
