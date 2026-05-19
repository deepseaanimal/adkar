export const ADKAR_ELEMENTS = [
  {
    id: 'awareness',
    letter: 'A',
    label: 'Awareness',
    color: '#3b82f6',
    bg: '#eff6ff',
    border: '#bfdbfe',
    tailwind: 'blue',
    shortDesc: 'Understanding why the change is needed',
    definition:
      'Not only knowing that the change is happening but WHY it is happening. The person must understand the nature of the change, why it is needed, and the risk of not changing.',
    leaderNote:
      'Effectiveness depends on how the message is received and internalised. A trusted messenger matters as much as the message itself.',
    keyQuestion:
      'Does this person truly understand why this change is necessary right now?',
    keyPoints: [
      'The person telling the message matters — trust affects how awareness lands',
      'Effectiveness depends on how the message is received and internalised',
    ],
    outcomeQuestions: [
      'What is the nature of the change?',
      'Why is the change needed?',
      'What is the risk of not changing?',
    ],
    iStatements: [
      'I understand why the change is happening.',
      'I understand why the change is happening RIGHT NOW.',
      'I understand the risk of not changing.',
      'I understand the internal and external triggers for this change.',
      "I understand our leaders' vision of this change.",
    ],
    scoringGuide: {
      1: 'Has not heard about the change or its reasons',
      2: 'Surface-level awareness — does not understand the why',
      3: 'Partially understands the reasons but has gaps or misconceptions',
      4: 'Understands why the change is needed with minor gaps',
      5: 'Fully understands why this change is happening, why now, and the risk of not changing',
    },
    interventions: [
      'Have a one-on-one conversation sharing the full business case for this change',
      'Explain specifically why this change is happening NOW, not later',
      'Share the risks and consequences of not changing',
      'Connect the change to organisational strategy and team mission',
      'Address questions and concerns openly and honestly',
      'Use a trusted messenger the person respects',
    ],
  },
  {
    id: 'desire',
    letter: 'D',
    label: 'Desire',
    color: '#f97316',
    bg: '#fff7ed',
    border: '#fed7aa',
    tailwind: 'orange',
    shortDesc: 'Motivation to participate and support the change',
    definition:
      'The personal motivation and choice to participate in and support the change. A person must make a personal decision to change — this cannot be forced.',
    leaderNote:
      "Desire is intrinsic. Focus on WIIFM (what's in it for me) and address fears honestly. Show the positive future state and involve the person where possible.",
    keyQuestion:
      'Has this person made a personal decision to support and participate in this change?',
    keyPoints: [
      "What's in it for me? — address both intrinsic and extrinsic motivations",
      'Desire cannot be forced — the person must make their own decision to change',
      'Address the negative consequences of not changing honestly',
      'Show a compelling picture of the positive future state',
    ],
    outcomeQuestions: [
      "What is in it for this person (WIIFM)?",
      'What are the negative consequences of not changing?',
      'Has this person made a personal decision to participate?',
    ],
    iStatements: [
      'I believe in the case for this change.',
      'I am supportive of this change.',
      "I know what's in it for me.",
      'I have made the decision to participate in this change.',
      'I believe that if I take on this change I will be successful.',
    ],
    scoringGuide: {
      1: 'Actively resistant or completely disengaged',
      2: 'Reluctant — significant reservations or fears about the change',
      3: 'Neutral or ambivalent — not resistant but not committed',
      4: 'Generally supportive with some hesitation remaining',
      5: 'Fully committed and personally motivated to participate',
    },
    interventions: [
      "Have a personal conversation addressing 'what's in it for me' for this individual",
      'Honestly discuss both the benefits and the challenges of changing',
      'Address specific fears or concerns this person has raised',
      'Involve the person in shaping how the change will be implemented',
      'Show a compelling and concrete picture of the positive future state',
      'Connect the change to their personal goals and career development',
      'Ensure their manager actively supports and endorses the change',
    ],
  },
  {
    id: 'knowledge',
    letter: 'K',
    label: 'Knowledge',
    color: '#0d9488',
    bg: '#f0fdfa',
    border: '#99f6e4',
    tailwind: 'teal',
    shortDesc: 'Skills and information needed to change',
    definition:
      'Information, training, and education on how to perform effectively throughout the change process and in the future state — covering both DURING and AFTER the transition.',
    leaderNote:
      'Knowledge is often the default response to change — but it only works if Awareness and Desire are in place first. Address both the transition period and the end state.',
    keyQuestion:
      'Does this person have the knowledge and training needed to succeed during and after the transition?',
    keyPoints: [
      'Usually the default response to change — but A & D must come first',
      'Affected by: existing knowledge base, learning style, and available resources',
      'Must cover how to act DURING the transition AND AFTER the change is complete',
      'Includes new processes, systems, tools, behaviours, skills, roles, and mindsets',
    ],
    outcomeQuestions: [
      'What knowledge and skills does this person need during the transition?',
      'What knowledge and skills will they need after the change is complete?',
      'What gaps exist, and how will they be addressed?',
    ],
    primaryStatement: 'I have the knowledge I need for the change to come.',
    iStatements: [
      'I clearly understand the impact this change will have on my behaviours, processes, tools, and workflows.',
      'I have the knowledge I need to be successful while the change is being implemented.',
      'I have the knowledge I need to be successful after the change is implemented.',
      'I do not foresee any knowledge gaps that might make me less successful.',
      'I have received adequate training and feel prepared to be successful.',
    ],
    scoringGuide: {
      1: 'Has received no training or information about new processes or behaviours',
      2: 'Minimal knowledge — significant gaps in understanding what to do',
      3: 'Partial knowledge — understands some aspects but has clear gaps',
      4: 'Has most of the knowledge needed with minor gaps remaining',
      5: 'Has all the knowledge and training needed to perform effectively in the new way',
    },
    interventions: [
      'Provide targeted training on the specific skills and processes required',
      'Create job aids, quick reference guides, and step-by-step documentation',
      'Set up mentoring, shadowing, or a buddy system with an experienced colleague',
      'Schedule Q&A sessions and office hours with subject matter experts',
      'Ensure training covers both the transition period AND the future state',
      "Tailor learning approach to this person's learning style and existing knowledge base",
    ],
  },
  {
    id: 'ability',
    letter: 'A',
    label: 'Ability',
    color: '#16a34a',
    bg: '#f0fdf4',
    border: '#bbf7d0',
    tailwind: 'green',
    shortDesc: 'Demonstrated capability to implement the change',
    definition:
      'The demonstrated capability to implement the change at the required performance level — turning knowledge into consistent action. A person shows ability when they can successfully and repeatedly demonstrate the required skills and behaviours.',
    leaderNote:
      'Knowledge does not directly lead to ability. Barriers (psychological, physical, habit, resources) can block ability even when knowledge exists. Practice, feedback, and removing barriers are key.',
    keyQuestion:
      'Can this person consistently demonstrate the required new skills and behaviours at the required performance level?',
    keyPoints: [
      'Knowledge does not directly lead to ability — knowing is not the same as doing',
      'Barriers: psychological blocks, physical limitations, force of habit, lack of time or resources',
      'Ability is demonstrated through repeated, consistent performance — not just intention',
      'Support by providing resources, feedback, coaching, and recognising adoption',
    ],
    outcomeQuestions: [
      'Can this person repeatedly demonstrate the required skills and behaviours?',
      'What barriers are preventing them from applying what they know?',
      'What support is needed to close the knowledge-to-ability gap?',
    ],
    primaryStatement: 'I am able to demonstrate the skills and/or behaviours needed to make the change.',
    iStatements: [
      'I believe I can close the knowledge-to-ability gap.',
      'I have been able to practise new skills and behaviours.',
      'I am capable of implementing the changes to my behaviours, processes, tools, and workflows.',
      'I believe the training provided will give me what I need to be successful.',
      'I can access additional knowledge and support when needed.',
    ],
    scoringGuide: {
      1: 'Unable to demonstrate new behaviours — significant barriers or blocks',
      2: 'Can perform new behaviours inconsistently or with significant support',
      3: 'Can demonstrate new behaviours but not consistently or at full performance level',
      4: 'Performs new behaviours consistently with minor coaching needed',
      5: 'Fully capable of performing all required new behaviours independently and consistently',
    },
    interventions: [
      'Create practice opportunities in a safe, low-risk environment',
      'Provide regular coaching and real-time performance feedback',
      'Identify and remove environmental, resource, or process barriers',
      'Break the change into smaller, more manageable steps',
      'Allow additional time during the transition period to build proficiency',
      'Pair with a high-performer for on-the-job coaching',
    ],
  },
  {
    id: 'reinforcement',
    letter: 'R',
    label: 'Reinforcement',
    color: '#e11d48',
    bg: '#fff1f2',
    border: '#fecdd3',
    tailwind: 'rose',
    shortDesc: 'Sustaining the change over time',
    definition:
      'The mechanisms — structural, environmental, or emotional — that sustain the change and prevent regression. Reinforcement has been achieved when the desired outcomes of the change are being sustained.',
    leaderNote:
      'Reinforcement prevents regression. Mix accountability with recognition. Both positive reinforcement (rewards) and absence of negative consequences matter.',
    keyQuestion:
      'Are there sufficient reinforcements in place to ensure this person continues to operate in the new way?',
    keyPoints: [
      'Reinforcement is required to SUSTAIN the change — without it, people revert',
      'Influenced by: accountability, absence of negative consequences, and reward',
      'Rewards can be simple (thank you, recognition) or formal (compensation, promotion)',
      'Reinforcement is achieved when the desired outcomes of the change are being sustained',
    ],
    outcomeQuestions: [
      'What mechanisms are in place to sustain this person in the new way of working?',
      'Are there clear consequences for reverting to old behaviours?',
      'Is this person being recognised and rewarded for demonstrating the change?',
    ],
    iStatements: [
      'I have meaningful reinforcements in place to help me continue to apply and sustain the change.',
      'I know the consequences of not performing in the new way.',
      'I am rewarded for performing in the new way.',
      'My performance in the new way has been evaluated.',
    ],
    scoringGuide: {
      1: 'No reinforcement mechanisms — likely reverting to old behaviours',
      2: 'Minimal reinforcement — largely inconsistent or ineffective',
      3: 'Some reinforcement exists but insufficient to consistently sustain the change',
      4: 'Good reinforcement in place with minor gaps',
      5: 'Robust reinforcement mechanisms — the change is fully embedded and self-sustaining',
    },
    interventions: [
      'Set up regular check-ins to review progress and celebrate specific wins',
      'Implement visible accountability mechanisms (metrics, team dashboards)',
      'Provide meaningful and timely recognition for demonstrating new behaviours',
      'Clarify the consequences of reverting to old behaviours',
      'Update performance reviews to reflect expected new behaviours and standards',
      'Share success stories with the broader team to create positive peer norms',
    ],
  },
];

export const SCORE_LABELS = {
  1: 'Not started',
  2: 'Low',
  3: 'Moderate',
  4: 'High',
  5: 'Fully achieved',
};

export const BARRIER_THRESHOLD = 3;

export function getBarrierPoint(assessment) {
  for (const el of ADKAR_ELEMENTS) {
    if (assessment[el.id].score <= BARRIER_THRESHOLD) return el;
  }
  return null;
}

export function getScoreStyle(score) {
  if (score <= 2) return { bg: '#fee2e2', text: '#991b1b', label: 'Needs attention' };
  if (score === 3) return { bg: '#fef9c3', text: '#854d0e', label: 'Barrier zone' };
  if (score === 4) return { bg: '#dcfce7', text: '#166534', label: 'On track' };
  return { bg: '#bbf7d0', text: '#14532d', label: 'Achieved' };
}

export const DEFAULT_INITIATIVES = [
  {
    id: 'vendor2',
    name: 'Vendor 2.0 Platform',
    emoji: '⚙️',
    themeColor: '#3b82f6',
    themeBg: '#eff6ff',
    description: 'Implementation of the new Vendor 2.0 platform',
    currentState: '',
    futureState: '',
    adoptionChallenge: '',
    risks: '',
    assessments: [],
  },
  {
    id: 'branding',
    name: 'New Branding',
    emoji: '✨',
    themeColor: '#7c3aed',
    themeBg: '#f5f3ff',
    description: 'Rollout of the new brand identity and guidelines',
    currentState: '',
    futureState: '',
    adoptionChallenge: '',
    risks: '',
    assessments: [],
  },
];
