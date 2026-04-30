'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Volume2 } from 'lucide-react';
import Link from 'next/link';
import { speakText } from '@/lib/voice/tts-client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const contentMap: Record<string, any> = {
  'voter-registration': {
    title: 'Voter Registration',
    content: `How to Register as a Voter in India

Eligibility:
• You must be an Indian citizen.
• You must be 18 years of age or older on January 1st of the year of revision of the electoral roll.
• You must ordinarily reside in the constituency where you are registering.

Steps to Register:
1. Visit the National Voters' Service Portal (NVSP) at voters.eci.gov.in or use the Voter Helpline App.
2. Fill Form 6 for new registration, Form 6A if an overseas citizen, Form 7 to delete a name, or Form 8 to update details.
3. Submit supporting documents: proof of age (birth certificate, passport, Aadhaar), proof of residence (utility bill, Aadhaar, passport), and a passport-size photograph.
4. You can also submit the form offline at the Electoral Registration Officer (ERO) or Booth Level Officer (BLO) of your constituency.
5. After verification, your Voter ID card (EPIC – Electoral Photo Identity Card) will be issued.

Important Tips:
• Check whether your name already appears in the electoral roll at electoralsearch.eci.gov.in before applying.
• Every year, January 1st is the qualifying date. If you turn 18 before January 1st, apply during the special summary revision period (usually October to December).
• Lost your Voter ID? Apply for a duplicate through Form 002 on the NVSP portal.
• Your Aadhaar is not a substitute for a Voter ID, but it can be used as identity proof on election day along with 11 other alternative documents.`
  },
  'evm-vvpat': {
    title: 'EVM & VVPAT',
    content: `Electronic Voting Machines (EVM) and VVPAT Explained

What is an EVM?
An Electronic Voting Machine (EVM) is a simple, tamper-proof device used in Indian elections since 1982. It consists of two units:
• Control Unit: Operated by the Presiding Officer inside the booth. It controls the balloting unit.
• Balloting Unit: The unit that voters use. It has numbered buttons corresponding to candidates on the ballot.

How Voting Works:
1. The Presiding Officer enables the balloting unit for each voter.
2. The voter presses the button next to their chosen candidate.
3. A "beep" confirms the vote is cast. The ballot unit then locks automatically.
4. No vote can be cast again until the next voter is enabled.

What is VVPAT?
Voter Verifiable Paper Audit Trail (VVPAT) is a printer attached to the EVM that produces a paper slip when you vote:
• The slip shows the serial number, candidate name, and party symbol of the person you voted for.
• It is visible through a transparent window for exactly 7 seconds.
• The slip then automatically falls into a sealed box — you cannot take it with you.
• This allows voters to verify their vote was recorded correctly.

Security Features:
• EVMs do not connect to the internet, Wi-Fi, or Bluetooth — they cannot be hacked remotely.
• They are manufactured only by two government undertakings: BEL (Bharat Electronics Limited) and ECIL (Electronics Corporation of India Limited).
• Each EVM has a unique serial number tracked by the ECI.
• First-Level Checks (FLC) are conducted before each election in the presence of political party representatives.`
  },
  'election-process': {
    title: 'The Election Process',
    content: `How Indian Elections Are Conducted – Step by Step

Step 1: Announcement of Election Schedule
The Election Commission of India (ECI) announces the election schedule including polling dates, phases, and the Model Code of Conduct (MCC) which comes into force immediately.

Step 2: Nomination of Candidates
Candidates file their nomination papers with the Returning Officer. Each nomination must be accompanied by a security deposit (₹25,000 for Lok Sabha; ₹10,000 for state assembly). Affidavits declaring criminal records, assets, and liabilities are mandatory.

Step 3: Scrutiny of Nominations
The Returning Officer scrutinizes nominations for validity. Invalid nominations are rejected during this phase.

Step 4: Withdrawal of Candidature
Candidates can withdraw their nomination within a specified period (usually 2 days after scrutiny).

Step 5: Campaign Period
Candidates and parties campaign to reach voters. Campaigning must stop 48 hours before polling begins (called the "campaign silence period").

Step 6: Polling Day
• Polling booths open from 7 AM to 6 PM (may vary by location).
• Voters present their Voter ID or any of 12 alternative documents.
• Voters are verified against the electoral roll and cast their vote on the EVM.
• Indelible ink is applied to the voter's left index finger to prevent double voting.

Step 7: Counting of Votes
• Counting happens on a designated day at counting centers.
• Postal ballots (from service voters, elderly, and disabled voters) are counted first.
• EVM results are then tallied.

Step 8: Declaration of Results
The Returning Officer declares the winning candidate. The candidate with the highest votes (First Past the Post system) wins — a majority is not required.

Step 9: Formation of Government
After all seats are contested, the party or alliance with a majority forms the government.`
  },
  'voter-rights': {
    title: 'Voter Rights & Duties',
    content: `Your Rights and Responsibilities as an Indian Voter

YOUR RIGHTS:

1. Right to Vote: Every citizen aged 18 and above, whose name is in the electoral roll, has the right to vote regardless of caste, religion, gender, or economic status.

2. Right to Secret Ballot: Your vote is completely secret. No one — not even election officials — can know which candidate you voted for.

3. Right to NOTA: If you do not wish to vote for any candidate, you can press the NOTA (None of the Above) button on the EVM. NOTA was introduced by the Supreme Court in 2013.

4. Right to Information: You can access candidates' criminal records, assets, and educational qualifications through their mandatory public affidavits filed with the ECI.

5. Right to Challenge: If someone else tries to vote in your name, you can challenge it at the booth with the Presiding Officer.

6. Right to a Companion: Blind or physically challenged voters can bring a companion of their choice to assist them in voting.

YOUR DUTIES:

1. Register and Vote: It is your civic responsibility to ensure your name is on the electoral roll and to exercise your vote.

2. Vote Without Inducement: Do not accept money, gifts, or benefits in exchange for your vote. This is a criminal offence under Section 171B of the Indian Penal Code.

3. Maintain Order at the Booth: Behave in an orderly manner. No photography is allowed inside the polling booth.

4. Respect the Code of Conduct: Do not display party symbols or campaign material within 100 metres of the polling booth on election day.

5. Report Violations: If you witness voter fraud, bribery, or election malpractice, report it to the ECI via the National Voter Helpline: 1950, or the cVIGIL app.`
  },
  'model-code-of-conduct': {
    title: 'Model Code of Conduct (MCC)',
    content: `What is the Model Code of Conduct?

The Model Code of Conduct (MCC) is a set of guidelines issued by the Election Commission of India that governs the behaviour of political parties, candidates, and the government during elections. It comes into effect as soon as the election schedule is announced and remains until the election process is complete.

Key Provisions:

For Political Parties & Candidates:
• No party can use government resources (vehicles, buildings, staff) for campaign purposes.
• Candidates cannot use religious, caste, or communal sentiments to seek votes.
• No bribery, threats, or intimidation of voters is permitted.
• All public meetings require permission from local authorities.
• Polling agents must carry valid passes issued by the Returning Officer.

For the Government:
• The ruling party cannot announce new welfare schemes, inaugurate government projects, or make policy decisions that could influence voters after MCC is in force.
• Government officials cannot be transferred without ECI approval.
• No use of government machinery (including Doordarshan, AIR) for party propaganda.

Election Expenses:
• Lok Sabha candidates can spend a maximum of ₹95 lakh (in bigger states) or ₹75 lakh (smaller states).
• Assembly candidates can spend a maximum of ₹40 lakh (bigger states) or ₹28 lakh (smaller states).
• All expenses must be documented and submitted within 30 days of results.

Violations:
• Violations can be reported via the cVIGIL mobile app or the National Voter Helpline 1950.
• The ECI can issue notices and take action, including cancelling a candidate's nomination or recommending criminal proceedings.`
  },
  'election-commission': {
    title: 'Election Commission of India',
    content: `About the Election Commission of India (ECI)

What is the ECI?
The Election Commission of India is an autonomous constitutional authority established in 1950 under Article 324 of the Indian Constitution. It is responsible for administering elections to the Parliament, State Legislatures, the office of the President, and the Vice-President of India.

Structure:
• The ECI is headed by the Chief Election Commissioner (CEC).
• Currently, it consists of the CEC and two Election Commissioners.
• All three have equal decision-making powers.
• They are appointed by the President of India and can only be removed through an impeachment process similar to that of a Supreme Court judge, ensuring their independence.

Key Functions:
• Preparation and continuous updating of electoral rolls.
• Announcing election schedules and phases.
• Recognition of political parties and allotment of election symbols.
• Setting and enforcing the Model Code of Conduct.
• Deploying central security forces at booths for free and fair elections.
• Monitoring election expenditure.
• Taking action on electoral malpractices.

Important Landmarks:
• 1952: First General Elections to the Lok Sabha.
• 1982: EVMs first used experimentally in Kerala.
• 2004: EVMs used across India for the first time.
• 2013: VVPAT introduced after Supreme Court directive.
• 2019: First elections with 100% VVPAT coverage alongside EVMs.

Contact & Helpline:
• Website: eci.gov.in
• National Voter Helpline: 1950
• cVIGIL App: For reporting MCC violations with geo-tagged photos/videos.`
  },
  'nota': {
    title: 'NOTA – None of the Above',
    content: `Understanding NOTA – None of the Above

What is NOTA?
NOTA stands for "None of the Above." It is an option on the EVM that allows voters to officially register their dissatisfaction with all candidates on the ballot without abstaining from voting entirely.

History:
• Introduced by a Supreme Court ruling on September 27, 2013, following a petition by the People's Union for Civil Liberties (PUCL).
• The ECI introduced NOTA from the November 2013 state assembly elections onwards.
• It is placed as the last option on the ballot after all candidates.

How to Vote NOTA:
• Press the last button on the Balloting Unit labeled "NOTA" with a ballot box icon (crossed out).
• Your vote is secret — no one knows you voted NOTA.

What Happens if NOTA Gets the Most Votes?
• If NOTA receives more votes than any individual candidate, the candidate with the second-highest votes (i.e., the candidate with the most actual votes) still wins.
• NOTA votes are not counted as "votes against" any candidate for winning purposes.
• However, a high NOTA count sends a political signal to parties about voter dissatisfaction.

Why NOTA Matters:
• It empowers voters to participate without endorsing any candidate.
• It discourages parties from fielding candidates with criminal backgrounds or poor track records.
• It gives a voice to those who might otherwise stay home in protest.

NOTA vs Abstaining:
• Abstaining means not voting at all — your absence is not recorded.
• NOTA means you went to the booth, were verified, and cast a valid "no confidence" vote — it is counted and reported publicly.`
  },
  'election-phases': {
    title: 'Multi-Phase Elections',
    content: `Why Are Indian Elections Held in Multiple Phases?

India conducts the world's largest democratic exercise, and due to its massive size and population, elections are held in multiple phases rather than a single day.

Why Multiple Phases?
1. Security Deployment: The ECI requires central paramilitary forces at every polling booth. With 10+ lakh booths across India, the same forces need to be deployed sequentially to different states and constituencies.

2. Geographical Challenges: Voting must happen even in remote forests, high-altitude regions, islands, and flood-prone areas. Logistics require time and planning.

3. Administrative Capacity: Enough trained officials, EVMs, VVPAT units, and vehicles must be deployed at each location. It is impossible to do this simultaneously for the entire country.

4. Law and Order: Historically sensitive constituencies get extra attention and timing adjustments to prevent violence.

How Phases Are Decided:
• The ECI assesses the size, population, security concerns, and past election history of each state.
• States may vote in one, two, or multiple phases. For example, Uttar Pradesh often votes in 7 phases due to its large number of constituencies and historical sensitivities.

Typical Schedule:
• Phase dates are announced together in the schedule.
• The entire General Election to the Lok Sabha typically takes 4–7 weeks.
• Once a phase starts, the Model Code of Conduct is fully active.

Simultaneous Elections:
• Some states hold their assembly elections alongside the Lok Sabha elections to save costs.
• The concept of "One Nation, One Election" (holding all elections together) is under political debate in India.`
  },
  'candidate-eligibility': {
    title: 'Candidate Eligibility',
    content: `Who Can Contest Elections in India?

Basic Eligibility Criteria:

For Lok Sabha (House of the People):
• Must be a citizen of India.
• Must be at least 25 years of age.
• Must be registered as a voter in any parliamentary constituency in India (not necessarily the one contested).
• Must not hold any office of profit under the Government of India.

For Rajya Sabha (Council of States):
• Must be a citizen of India.
• Must be at least 30 years of age.
• Must be registered as a voter in the state from which they are contesting (requirement was relaxed in 2003; now can be from any state).

For State Legislative Assembly (Vidhan Sabha):
• Must be a citizen of India.
• Must be at least 25 years of age.
• Must be registered as a voter in any constituency within that state.

Disqualification Grounds (under the Representation of the People Act, 1951):
• Convicted of a criminal offence and sentenced to 2 or more years of imprisonment (disqualified for 6 years after release).
• Dismissed from government service for corruption or disloyalty.
• Found guilty of corrupt practices in a previous election.
• Failure to lodge election expense accounts.
• Holding an office of profit under the government.

Mandatory Declarations:
Every candidate must file an affidavit (Form 26) declaring:
• Criminal cases pending or convicted.
• Assets and liabilities of self and spouse.
• Educational qualifications.
These are made public so voters can make informed decisions.

Security Deposit:
• Lok Sabha: ₹25,000 (₹12,500 for SC/ST candidates).
• State Assembly: ₹10,000 (₹5,000 for SC/ST candidates).
• Forfeited if the candidate fails to secure more than 1/6th of total valid votes polled.`
  },
  'electoral-roll': {
    title: 'Electoral Roll & EPIC',
    content: `Understanding the Electoral Roll and Voter ID (EPIC)

What is the Electoral Roll?
The electoral roll (also called the voter list) is an official register of all eligible voters in a constituency. It is maintained by the Election Commission of India through the respective State Election Officers.

How is it Prepared?
• The roll is updated every year, usually around October to December (Special Summary Revision period).
• Booth Level Officers (BLOs) conduct door-to-door surveys to add new voters, delete deceased voters, and update changed details.
• The final roll is published on January 1st (or a notified date) of each year.

How to Check Your Name:
• Visit electoralsearch.eci.gov.in.
• Use the Voter Helpline App or SMS "EPIC <space> VOTER ID NUMBER" to 1950.
• Visit your BLO or Electoral Registration Officer.

Corrections and Updates:
• Form 8: To update address, photo, or correct errors in an existing entry.
• Form 7: To delete a name (e.g., of a deceased family member).
• Form 6: For fresh registration.

What is EPIC?
EPIC stands for Electoral Photo Identity Card, commonly known as the Voter ID card.
• Issued by the ECI to every registered voter.
• Required at the polling booth on election day.
• If lost, apply for a duplicate through Form 002 on the NVSP portal (voters.eci.gov.in).

Alternative Documents Accepted at Booths (if EPIC is not available):
The following 12 documents are accepted by the ECI as alternative proof of identity on polling day:
1. Aadhaar Card
2. MNREGA Job Card
3. Passbooks with photograph (issued by banks/post offices)
4. Health Insurance Smart Card (under ESIC scheme)
5. Driving Licence
6. PAN Card
7. Smart Card by RGI under NPR
8. Indian Passport
9. Pension Documents with photograph
10. Central/State Government/PSU issued service identity cards with photograph
11. MP/MLA/MLC official identity card
12. Unique Disability ID (UDID) Card`
  }
};

export default function TopicPage({ params: { locale, topicId } }: { params: { locale: string, topicId: string } }) {
  const data = contentMap[topicId] || { title: 'Topic Not Found', content: 'This topic does not exist.' };

  const handlePlayAudio = () => {
    speakText(data.content, locale);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-8 min-h-[calc(100vh-4rem)]">
      <Link href={`/${locale}/education`}>
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Topics
        </Button>
      </Link>

      <div className="bg-card p-6 md:p-10 rounded-2xl shadow-sm border space-y-6">
        <div className="flex items-center justify-between border-b pb-6">
          <h1 className="text-3xl font-bold text-india-navy">{data.title}</h1>
          <Button variant="outline" size="icon" onClick={handlePlayAudio} aria-label="Listen to article" className="rounded-full text-india-saffron border-india-saffron">
            <Volume2 className="w-5 h-5" />
          </Button>
        </div>

        <div className="prose prose-lg max-w-none text-foreground leading-relaxed whitespace-pre-wrap">
          {data.content}
        </div>
      </div>
    </div>
  );
}
