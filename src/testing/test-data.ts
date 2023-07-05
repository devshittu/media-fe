import { useEffect, useState } from 'react';
import { StoryItem } from './types';
import { PAGINATE_STORIES_LIMIT } from '@/config/constants';

export const testData = {
  users: [
    {
      id: 'KV4Lv9yUHtNVB42V0ZrFf',
      createdAt: 1645628972465,
      email: 'user1@test.com',
      password: 'test@123',
      categoryId: 'amYXmIyT9mD9GyO6CCr',
    },
  ],
  admin: [
    {
      id: 'amYXmIyT9mD9GyO6CCr',
      createdAt: 1645628972465,
      adminId: 'KV4Lv9yUHtNVB42V0ZrFf',
      name: 'Test Org 1',
      email: 'org1@test.com',
      phone: '944-528-1711',
      info: 'Totam alias fuga enim esse ullam sit. Nisi animi ut at voluptatem odit nam ea. Et fuga consequatur similique asperiores non suscipit corrupti aperiam. Molestiae quae aut laborum soluta blanditiis cupiditate hic nobis provident.Et quae aut labore aut rerum. Nisi at autem. Enim ipsum enim consectetur sequi consequatur. Sint qui qui quam. Voluptas dignissimos rem et natus. Autem et mollitia hic suscipit illum placeat.Optio aut sit assumenda quo eius omnis sed non consequatur. Numquam perferendis ea sit rerum officia cupiditate aut itaque doloremque. Itaque alias est repellendus. Esse consectetur tenetur velit autem excepturi. Velit perspiciatis saepe dolorum fugiat. Adipisci odio porro quibusdam similique sunt temporibus ipsam.Dolor assumenda aut qui et in perferendis et. Possimus quam qui impedit. Nesciunt aliquid qui consequatur possimus eos velit deserunt magni qui. Nam accusantium libero corrupti.Nulla in ut sunt rerum voluptatem rerum voluptates. Quis expedita natus earum similique officiis rem. Possimus similique architecto ut ad ea quia laborum. Officia voluptatibus quos aliquid delectus. Est voluptates necessitatibus iure et provident iusto at voluptatem sit. Molestiae exercitationem repellat tempore. Id excepturi officiis iste ullam similique et hic sit. Quis et eaque quidem. Qui voluptas ea et rem recusandae suscipit voluptatem sit. Sint ut officiis nihil perferendis nihil quibusdam molestiae. Blanditiis nihil ab illo. Voluptatem mollitia officia aperiam. Esse voluptatum voluptatem nihil minima. Placeat itaque aut numquam. Quis nobis commodi voluptatum ipsum perspiciatis aut. Omnis nulla enim natus architecto in. Autem ab aperiam vitae ipsa quia. Adipisci deleniti voluptas ea nam nesciunt. Doloribus delectus modi et. Voluptatem qui sit eaque qui totam. In facilis excepturi et quae et ullam maiores et sit. Enim consequatur dolorem dolorem eum ullam rerum cum similique odit. Aut velit rem est id et tenetur ut. Velit sunt et velit odit qui mollitia aut harum aut. Cupiditate doloribus dicta reprehenderit aliquid consequatur eum voluptas veritatis. Ut corporis sed et magni consequatur voluptatem.',
    },
  ],
  stories: [
    {
      id: '1',
      title: 'Climate Change Summit Held in Glasgow',
      slug: 'climate-change-summit-glasgow',
      body: 'World leaders and experts gather in Glasgow to discuss global strategies for combating climate change and achieving sustainable development. #ClimateChange #Sustainability',
      categoryId: '1',
      createdAt: 1679046000,
      updatedAt: 1679046000,
      parent_stories: [],
      children_stories: ['2', '3'],
    },
    {
      id: '2',
      title: 'Developing Nations Demand Climate Action Commitments',
      slug: 'developing-nations-demand-climate-action-commitments',
      body: 'Representatives from developing nations urge developed countries to fulfill their climate action commitments, including financial aid and technology transfer. #ClimateAction #DevelopingNations',
      categoryId: '1',
      createdAt: 1679218800,
      updatedAt: 1679218800,
      parent_stories: ['1'],
      children_stories: ['4'],
    },
    {
      id: '3',
      title: 'New Study Reveals Alarming Ocean Acidification Levels',
      slug: 'new-study-ocean-acidification-levels',
      body: 'A recent scientific study highlights the escalating levels of ocean acidification, underscoring the urgent need for marine conservation efforts. #OceanAcidification #MarineConservation',
      categoryId: '1',
      createdAt: 1679218800,
      updatedAt: 1679218800,
      parent_stories: ['1'],
      children_stories: [],
    },
    {
      id: '4',
      title: 'Election Results Announced, Marking a Historic Victory',
      slug: 'election-results-announced-historic-victory',
      body: 'The electoral commission officially declares the election results, signaling a historic victory for the newly elected leader. #ElectionResults #Victory',
      categoryId: '2',
      createdAt: 1679391600,
      updatedAt: 1679391600,
      parent_stories: ['2'],
      children_stories: ['5'],
    },
    {
      id: '5',
      title:
        'Opposition Party Concedes Defeat, Pledges Support for New Government',
      slug: 'opposition-party-concedes-defeat-pledges-support',
      body: 'Following the election results, the opposition party gracefully concedes defeat and promises to work collaboratively with the newly elected government for the betterment of the nation. #OppositionParty #Unity',
      categoryId: '2',
      createdAt: 1679391600,
      updatedAt: 1679391600,
      parent_stories: ['4'],
      children_stories: ['6'],
    },
    {
      id: '6',
      title: 'Inauguration Ceremony Held, New Government Sworn In',
      slug: 'inauguration-ceremony-new-government-sworn-in',
      body: 'Amidst an atmosphere of celebration and optimism, the inauguration ceremony takes place, officially swearing in the new government. #Inauguration #NewGovernment',
      categoryId: '2',
      createdAt: 1679391600,
      updatedAt: 1679391600,
      parent_stories: ['5'],
      children_stories: ['8'],
    },
    {
      id: '7',
      title: 'Tech Startup Secures Major Investment, Plans Expansion',
      slug: 'tech-startup-secures-major-investment-expansion',
      body: 'A Nigerian tech startup successfully secures a significant investment, enabling them to expand their operations, innovate new products, and create employment opportunities. #TechStartup #Investment',
      categoryId: '3',
      createdAt: 1679391600,
      updatedAt: 1679391600,
      parent_stories: ['6'],
      children_stories: ['8', '9'],
    },
    {
      id: '8',
      title: 'Government Launches Initiative to Support Small Businesses',
      slug: 'government-launches-initiative-support-small-businesses',
      body: 'The government introduces a comprehensive support initiative aimed at assisting small businesses affected by the economic downturn, providing financial aid, training, and resources. #SmallBusinessSupport #GovernmentInitiative',
      categoryId: '3',
      createdAt: 1679650800,
      updatedAt: 1679650800,
      parent_stories: ['7'],
      children_stories: ['10'],
    },
    {
      id: '9',
      title: 'Inflation Rates Stabilize, Positive Economic Outlook Projected',
      slug: 'inflation-rates-stabilize-positive-economic-outlook',
      body: 'After a period of economic uncertainty, inflation rates stabilize, prompting experts to project a positive economic outlook with increased consumer spending and business growth. #InflationRates #EconomicOutlook',
      categoryId: '3',
      createdAt: 1679650800,
      updatedAt: 1679650800,
      parent_stories: ['7'],
      children_stories: ['11'],
    },
    {
      id: '10',
      title:
        'New Infrastructure Projects Announced, Boosting Job Opportunities',
      slug: 'new-infrastructure-projects-announced-job-opportunities',
      body: 'The government unveils ambitious infrastructure projects aimed at enhancing transportation, energy, and telecommunications sectors, providing a significant number of job opportunities. #InfrastructureProjects #JobOpportunities',
      categoryId: '3',
      createdAt: 1679650800,
      updatedAt: 1679650800,
      parent_stories: ['8'],
      children_stories: ['12'],
    },
    {
      id: '11',
      title: 'Nigerian Startups Attract Global Attention at Tech Conference',
      slug: 'nigerian-startups-attract-global-attention-tech-conference',
      body: "Several Nigerian startups gain international recognition for their innovative solutions and entrepreneurial spirit at a prestigious tech conference, showcasing Nigeria's potential as a tech hub. #NigerianStartups #TechConference",
      categoryId: '3',
      createdAt: 1679650800,
      updatedAt: 1679650800,
      parent_stories: ['9'],
      children_stories: [],
    },
    {
      id: '12',
      title:
        'Education Sector Reforms Aimed at Enhancing Learning Opportunities',
      slug: 'education-sector-reforms-enhancing-learning-opportunities',
      body: 'The Ministry of Education implements comprehensive reforms to improve the quality of education, including curriculum updates, teacher training programs, and infrastructure development. #EducationSector #Reforms',
      categoryId: '4',
      createdAt: 1679737200,
      updatedAt: 1679737200,
      parent_stories: ['10'],
      children_stories: ['13'],
    },
    {
      id: '13',
      title:
        'STEM Education Initiatives Encourage Innovation and Critical Thinking',
      slug: 'stem-education-initiatives-encourage-innovation',
      body: 'In a bid to foster innovation and critical thinking skills, the government introduces STEM (Science, Technology, Engineering, and Mathematics) education initiatives across schools, promoting a future-ready workforce. #STEMEducation #Innovation',
      categoryId: '4',
      createdAt: 1679737200,
      updatedAt: 1679737200,
      parent_stories: ['12'],
      children_stories: ['14'],
    },
    {
      id: '14',
      title:
        'Rural Education Centers Bridge the Gap in Access to Quality Education',
      slug: 'rural-education-centers-bridge-gap-access-education',
      body: 'To address the disparity in educational opportunities, rural education centers are established, providing access to quality education, resources, and mentorship to students in remote areas. #RuralEducation #AccessToEducation',
      categoryId: '4',
      createdAt: 1679737200,
      updatedAt: 1679737200,
      parent_stories: ['13'],
      children_stories: ['15'],
    },
    {
      id: '15',
      title:
        'Youth Empowerment Programs Foster Entrepreneurship and Skills Development',
      slug: 'youth-empowerment-programs-entrepreneurship-skills-development',
      body: 'Government-led youth empowerment programs support entrepreneurship and skills development among young individuals, encouraging self-reliance, job creation, and economic growth. #YouthEmpowerment #SkillsDevelopment',
      categoryId: '4',
      createdAt: 1679737200,
      updatedAt: 1679737200,
      parent_stories: ['14'],
      children_stories: [],
    },
    {
      id: '16',
      title:
        'New Medical Research Center Established to Combat Infectious Diseases',
      slug: 'medical-research-center-combat-infectious-diseases',
      body: 'A state-of-the-art medical research center is inaugurated, focusing on advanced research, treatments, and preventive measures for infectious diseases prevalent in the region. #MedicalResearch #InfectiousDiseases',
      categoryId: '5',
      createdAt: 1678973634000,
      updatedAt: 1678973634000,
      parent_stories: [],
      children_stories: ['17'],
    },
    {
      id: '17',
      title: 'Breakthrough Drug Shows Promise in Cancer Treatment',
      slug: 'breakthrough-drug-shows-promise-cancer-treatment',
      body: 'A newly developed drug demonstrates significant efficacy in cancer treatment, offering hope to patients and medical professionals alike. Clinical trials show promising results. #CancerTreatment #MedicalBreakthrough',
      categoryId: '5',
      createdAt: 1678974634000,
      updatedAt: 1678974634000,
      parent_stories: ['16'],
      children_stories: ['18'],
    },
    {
      id: '18',
      title: 'Mental Health Awareness Campaign Raises Public Consciousness',
      slug: 'mental-health-awareness-campaign-raises-consciousness',
      body: 'A nationwide mental health awareness campaign garners widespread attention, challenging stigmas, promoting open discussions, and encouraging individuals to seek help and support. #MentalHealthAwareness #Wellbeing',
      categoryId: '5',
      createdAt: 1678975634000,
      updatedAt: 1678975634000,
      parent_stories: ['17'],
      children_stories: ['19'],
    },
    {
      id: '19',
      title: 'Telemedicine Platforms Expand Access to Healthcare Services',
      slug: 'telemedicine-platforms-expand-access-healthcare-services',
      body: 'The rise of telemedicine platforms provides convenient and accessible healthcare services to individuals in remote areas, reducing barriers and improving healthcare outcomes. #Telemedicine #HealthcareServices',
      categoryId: '5',
      createdAt: 1678976634000,
      updatedAt: 1678976634000,
      parent_stories: ['18'],
      children_stories: ['20'],
    },
    {
      id: '20',
      title: 'Medical Tourism Boosts Economy, Attracts Global Patients',
      slug: 'medical-tourism-boosts-economy-attracts-global-patients',
      body: 'Nigeria emerges as a prominent destination for medical tourism, offering high-quality healthcare services, state-of-the-art facilities, and specialized treatments to patients from around the world. #MedicalTourism #HealthcareIndustry',
      categoryId: '5',
      createdAt: 1678977634000,
      updatedAt: 1678977634000,
      parent_stories: ['19'],
      children_stories: [],
    },
    {
      id: '21',
      title: 'New Solar Power Plant Inaugurated, Promoting Renewable Energy',
      slug: 'new-solar-power-plant-inaugurated-renewable-energy',
      body: "A state-of-the-art solar power plant is inaugurated, contributing to Nigeria's renewable energy goals and reducing reliance on fossil fuels. #SolarPower #RenewableEnergy",
      categoryId: '6',
      createdAt: 1678978634000,
      updatedAt: 1678978634000,
      parent_stories: [],
      children_stories: ['22', '23'],
    },
    {
      id: '22',
      title: 'Government Announces Subsidies for Electric Vehicles',
      slug: 'government-announces-subsidies-electric-vehicles',
      body: 'The government introduces subsidies and incentives to promote the adoption of electric vehicles, aiming to reduce carbon emissions and create a sustainable transportation system. #ElectricVehicles #Sustainability',
      categoryId: '6',
      createdAt: 1678979634000,
      updatedAt: 1678979634000,
      parent_stories: ['21'],
      children_stories: ['24'],
    },
    {
      id: '23',
      title: 'Nigeria Hosts International Renewable Energy Summit',
      slug: 'nigeria-hosts-international-renewable-energy-summit',
      body: 'Nigeria takes center stage in the global renewable energy community by hosting a prestigious summit, bringing together experts, policymakers, and industry leaders to discuss sustainable energy solutions. #RenewableEnergySummit #Sustainability',
      categoryId: '6',
      createdAt: 1678980634000,
      updatedAt: 1678980634000,
      parent_stories: ['21'],
      children_stories: ['25'],
    },
    {
      id: '24',
      title: 'Rapid Expansion of Green Initiatives in Urban Areas',
      slug: 'rapid-expansion-green-initiatives-urban-areas',
      body: 'Urban centers witness a rapid expansion of green initiatives, including the establishment of eco-friendly buildings, urban gardens, and efficient waste management systems, promoting sustainability in cities. #GreenInitiatives #UrbanSustainability',
      categoryId: '6',
      createdAt: 1678981634000,
      updatedAt: 1678981634000,
      parent_stories: ['22'],
      children_stories: ['26'],
    },
    {
      id: '25',
      title: 'Community-Led Conservation Efforts Preserve Wildlife Habitats',
      slug: 'community-led-conservation-efforts-preserve-wildlife-habitats',
      body: 'Communities across Nigeria take proactive measures to protect and preserve wildlife habitats, promoting biodiversity conservation and sustainable ecosystems. #ConservationEfforts #WildlifePreservation',
      categoryId: '6',
      createdAt: 1678982634000,
      updatedAt: 1678982634000,
      parent_stories: ['23'],
      children_stories: ['27'],
    },
    {
      id: '26',
      title: 'Tree Planting Campaign Restores Forest Cover',
      slug: 'tree-planting-campaign-restores-forest-cover',
      body: 'A nationwide tree planting campaign gains momentum, contributing to the restoration of forest cover, combating deforestation, and mitigating the impacts of climate change. #TreePlanting #ForestRestoration',
      categoryId: '6',
      createdAt: 1678983634000,
      updatedAt: 1678983634000,
      parent_stories: ['24'],
      children_stories: ['28'],
    },
    {
      id: '27',
      title: 'Sustainable Agriculture Practices Empower Farmers',
      slug: 'sustainable-agriculture-practices-empower-farmers',
      body: 'Farmers embrace sustainable agriculture practices, such as organic farming, crop rotation, and water conservation techniques, ensuring food security, environmental stewardship, and improved livelihoods. #SustainableAgriculture #FarmersEmpowerment',
      categoryId: '7',
      createdAt: 1678984634000,
      updatedAt: 1678984634000,
      parent_stories: [],
      children_stories: ['29', '30'],
    },
    {
      id: '28',
      title: 'Smart Irrigation Systems Enhance Crop Yields',
      slug: 'smart-irrigation-systems-enhance-crop-yields',
      body: 'The adoption of smart irrigation systems enables farmers to optimize water usage, minimize water wastage, and achieve higher crop yields, contributing to sustainable agriculture practices. #SmartIrrigation #CropYields',
      categoryId: '7',
      createdAt: 1678985634000,
      updatedAt: 1678985634000,
      parent_stories: ['26'],
      children_stories: ['31'],
    },
    {
      id: '29',
      title: 'Women Empowerment Programs Drive Agricultural Innovation',
      slug: 'women-empowerment-programs-drive-agricultural-innovation',
      body: 'Dedicated programs and initiatives empower women in rural areas to take on leadership roles in agriculture, driving innovation, promoting gender equality, and fostering inclusive rural development. #WomenEmpowerment #AgriculturalInnovation',
      categoryId: '7',
      createdAt: 1678986634000,
      updatedAt: 1678986634000,
      parent_stories: ['27'],
      children_stories: ['32'],
    },
    {
      id: '30',
      title: 'Youth-Led Cooperatives Revolutionize Farming Practices',
      slug: 'youth-led-cooperatives-revolutionize-farming-practices',
      body: 'Youth-led farming cooperatives harness technological advancements and sustainable farming techniques to revolutionize agricultural practices, creating employment opportunities and driving rural development. #YouthCooperatives #FarmingPractices',
      categoryId: '7',
      createdAt: 1678987634000,
      updatedAt: 1678987634000,
      parent_stories: ['27'],
      children_stories: ['33'],
    },
    {
      id: '31',
      title: 'Nigeria Becomes Leading Exporter of Agricultural Products',
      slug: 'nigeria-leading-exporter-agricultural-products',
      body: 'Through increased investment, improved productivity, and quality assurance measures, Nigeria emerges as a leading exporter of agricultural products, contributing to economic growth and international trade. #AgriculturalExports #EconomicGrowth',
      categoryId: '7',
      createdAt: 1678988634000,
      updatedAt: 1678988634000,
      parent_stories: ['28'],
      children_stories: ['34'],
    },
    {
      id: '32',
      title: 'Technological Innovations Transform Healthcare Delivery',
      slug: 'technological-innovations-transform-healthcare-delivery',
      body: 'Technological advancements, such as telemedicine, artificial intelligence, and wearable devices, revolutionize healthcare delivery, improving access to quality care, patient outcomes, and disease management. #HealthcareInnovation #TechnologicalAdvancements',
      categoryId: '8',
      createdAt: 1678989634000,
      updatedAt: 1678989634000,
      parent_stories: [],
      children_stories: ['35', '36'],
    },
    {
      id: '33',
      title: 'Mobile Health Apps Empower Individuals in Self-Care',
      slug: 'mobile-health-apps-empower-individuals-self-care',
      body: 'The proliferation of mobile health apps empowers individuals to take charge of their health through self-care practices, including fitness tracking, nutrition monitoring, and mental wellbeing support. #MobileHealthApps #SelfCare',
      categoryId: '8',
      createdAt: 1678990634000,
      updatedAt: 1678990634000,
      parent_stories: ['32'],
      children_stories: ['37'],
    },
    {
      id: '34',
      title: 'Data Analytics Enhance Healthcare Decision-Making',
      slug: 'data-analytics-enhance-healthcare-decision-making',
      body: 'The utilization of data analytics and big data in healthcare enables informed decision-making, personalized treatment plans, and improved patient outcomes, revolutionizing the healthcare industry. #DataAnalytics #HealthcareDecisionMaking',
      categoryId: '8',
      createdAt: 1678991634000,
      updatedAt: 1678991634000,
      parent_stories: ['31'],
      children_stories: ['38'],
    },
    {
      id: '35',
      title: 'Artificial Intelligence in Diagnostics and Disease Prevention',
      slug: 'artificial-intelligence-diagnostics-disease-prevention',
      body: 'Artificial intelligence algorithms and machine learning models play a pivotal role in diagnostics, early disease detection, and preventive healthcare strategies, revolutionizing medical practices. #AIinHealthcare #DiseasePrevention',
      categoryId: '8',
      createdAt: 1678992634000,
      updatedAt: 1678992634000,
      parent_stories: ['32'],
      children_stories: ['39'],
    },
    {
      id: '36',
      title: 'Robotics-Assisted Surgeries Ensure Precision and Efficiency',
      slug: 'robotics-assisted-surgeries-precision-efficiency',
      body: 'Robotic-assisted surgeries gain popularity in Nigerian hospitals, providing surgeons with enhanced precision, reduced invasiveness, and faster recovery times, leading to improved patient outcomes. #RoboticSurgery #MedicalAdvancements',
      categoryId: '8',
      createdAt: 1678993634000,
      updatedAt: 1678993634000,
      parent_stories: ['32'],
      children_stories: ['40'],
    },
    {
      id: '37',
      title: 'Emerging Biotechnology Solutions Address Health Challenges',
      slug: 'emerging-biotechnology-solutions-address-health-challenges',
      body: 'Cutting-edge biotechnology solutions, including gene editing, personalized medicine, and regenerative therapies, offer new possibilities in addressing complex health challenges and improving patient care. #Biotechnology #HealthcareInnovation',
      categoryId: '8',
      createdAt: 1678994634000,
      updatedAt: 1678994634000,
      parent_stories: ['33'],
      children_stories: ['41'],
    },
    {
      id: '38',
      title: 'Digital Health Records Improve Patient Management',
      slug: 'digital-health-records-improve-patient-management',
      body: 'The digitization of health records streamlines patient management, enabling secure access, efficient information exchange, and coordinated care among healthcare providers, leading to improved healthcare delivery. #DigitalHealthRecords #PatientManagement',
      categoryId: '8',
      createdAt: 1678995634000,
      updatedAt: 1678995634000,
      parent_stories: ['34'],
      children_stories: ['42'],
    },
    {
      id: '39',
      title: 'Telemedicine Expands Access to Healthcare Services',
      slug: 'telemedicine-expands-access-healthcare-services',
      body: 'Telemedicine platforms bridge the gap between healthcare providers and patients in remote areas, expanding access to essential healthcare services, consultations, and medical expertise. #Telemedicine #HealthcareAccessibility',
      categoryId: '8',
      createdAt: 1678996634000,
      updatedAt: 1678996634000,
      parent_stories: ['35'],
      children_stories: ['43'],
    },
    {
      id: '40',
      title: 'Innovative Partnerships Drive Health Technology Advancements',
      slug: 'innovative-partnerships-drive-health-technology-advancements',
      body: 'Collaborations between technology companies, healthcare institutions, and research organizations drive innovations in health technology, fostering breakthroughs in diagnostics, treatment, and disease prevention. #HealthTechAdvancements #Partnerships',
      categoryId: '8',
      createdAt: 1678997634000,
      updatedAt: 1678997634000,
      parent_stories: ['36'],
      children_stories: ['44'],
    },
    {
      id: '41',
      title: 'New Cultural Heritage Museum Celebrates Nigerian Art',
      slug: 'new-cultural-heritage-museum-celebrates-nigerian-art',
      body: 'A new cultural heritage museum dedicated to Nigerian art and artifacts is inaugurated, showcasing the rich history, diverse cultures, and artistic expressions of the nation, promoting cultural preservation and tourism. #CulturalHeritage #NigerianArt',
      categoryId: '9',
      createdAt: 1678998634000,
      updatedAt: 1678998634000,
      parent_stories: [],
      children_stories: ['45', '46'],
    },
    {
      id: '42',
      title: 'Nollywood Film Wins International Recognition',
      slug: 'nollywood-film-wins-international-recognition',
      body: "A Nigerian film produced by the Nollywood industry receives international acclaim, winning awards and accolades at prestigious film festivals, further establishing Nigeria's position in the global film industry. #Nollywood #FilmIndustry",
      categoryId: '9',
      createdAt: 1678999634000,
      updatedAt: 1678999634000,
      parent_stories: ['41'],
      children_stories: ['47'],
    },
    {
      id: '43',
      title: 'Literary Festival Promotes Nigerian Writers and Literature',
      slug: 'literary-festival-promotes-nigerian-writers-literature',
      body: 'A vibrant literary festival brings together Nigerian writers, authors, and book enthusiasts, showcasing the rich literary heritage, promoting reading culture, and fostering the growth of Nigerian literature. #LiteraryFestival #NigerianWriters',
      categoryId: '9',
      createdAt: 1679000634000,
      updatedAt: 1679000634000,
      parent_stories: ['41'],
      children_stories: ['48'],
    },
    {
      id: '44',
      title: 'Artists Transform Public Spaces with Murals and Street Art',
      slug: 'artists-transform-public-spaces-murals-street-art',
      body: 'Talented artists beautify public spaces across Nigeria with captivating murals and vibrant street art, revitalizing neighborhoods, promoting cultural expression, and attracting visitors. #StreetArt #PublicArt',
      categoryId: '9',
      createdAt: 1679001634000,
      updatedAt: 1679001634000,
      parent_stories: ['40'],
      children_stories: ['49'],
    },
    {
      id: '45',
      title: 'Fashion Designers Showcasing Nigerian Styles on Global Runways',
      slug: 'fashion-designers-showcasing-nigerian-styles-global-runways',
      body: 'Nigerian fashion designers gain international recognition, showcasing unique Nigerian styles, traditional fabrics, and innovative designs on prestigious global runways, contributing to the growth of the Nigerian fashion industry. #NigerianFashion #GlobalRunways',
      categoryId: '9',
      createdAt: 1679002634000,
      updatedAt: 1679002634000,
      parent_stories: ['41'],
      children_stories: ['50'],
    },
    {
      id: '46',
      title: 'Cultural Exchange Programs Strengthen International Ties',
      slug: 'cultural-exchange-programs-strengthen-international-ties',
      body: 'Through cultural exchange programs, Nigerian artists, musicians, and performers collaborate with international counterparts, fostering cross-cultural understanding, promoting diversity, and strengthening diplomatic ties. #CulturalExchange #InternationalRelations',
      categoryId: '9',
      createdAt: 1679003634000,
      updatedAt: 1679003634000,
      parent_stories: ['41'],
      children_stories: [],
    },
  ],

  categories: [
    {
      id: '1',
      title: 'World News',
      description: 'Latest news and events from around the world.',
      slug: 'world-news',
    },
    {
      id: '2',
      title: 'Politics',
      description:
        'Updates on political developments, elections, and government policies.',
      slug: 'politics',
    },
    {
      id: '3',
      title: 'Business',
      description:
        'News related to the business world, economy, and financial markets.',
      slug: 'business',
    },
    {
      id: '4',
      title: 'Technology',
      description:
        'Information on the latest technological advancements, gadgets, and innovations.',
      slug: 'technology',
    },
    {
      id: '5',
      title: 'Science',
      description:
        'Discoveries, research, and breakthroughs in various scientific fields.',
      slug: 'science',
    },
    {
      id: '6',
      title: 'Health',
      description:
        'Updates on healthcare, medical research, and wellness tips.',
      slug: 'health',
    },
    {
      id: '7',
      title: 'Sports',
      description: 'Coverage of sports events, matches, and athlete profiles.',
      slug: 'sports',
    },
    {
      id: '8',
      title: 'Entertainment',
      description: 'Music, movies, TV shows, and celebrity news.',
      slug: 'entertainment',
    },
    {
      id: '9',
      title: 'Lifestyle',
      description:
        'Tips and trends related to fashion, beauty, home, and personal development.',
      slug: 'lifestyle',
    },
    {
      id: '10',
      title: 'Travel',
      description:
        'Inspiration, guides, and recommendations for travel destinations and experiences.',
      slug: 'travel',
    },
    {
      id: '11',
      title: 'Food',
      description: 'Recipes, restaurant reviews, and culinary trends.',
      slug: 'food',
    },
    {
      id: '12',
      title: 'Fashion',
      description: 'Fashion trends, runway coverage, and style tips.',
      slug: 'fashion',
    },
    {
      id: '13',
      title: 'Art and Culture',
      description:
        'Art exhibitions, cultural events, and creative expressions.',
      slug: 'art-culture',
    },
    {
      id: '14',
      title: 'Education',
      description:
        'News and updates in the field of education, learning, and academic institutions.',
      slug: 'education',
    },
    {
      id: '15',
      title: 'Environment',
      description:
        'Coverage of environmental issues, conservation efforts, and sustainability.',
      slug: 'environment',
    },
    {
      id: '16',
      title: 'Finance',
      description:
        'Insights into personal finance, investments, and money management.',
      slug: 'finance',
    },
    {
      id: '17',
      title: 'Automotive',
      description:
        'News and reviews about cars, motorcycles, and the automotive industry.',
      slug: 'automotive',
    },
    {
      id: '18',
      title: 'Gaming',
      description: 'Updates on video games, gaming consoles, and esports.',
      slug: 'gaming',
    },
    {
      id: '19',
      title: 'Social Issues',
      description: 'Discussions on social justice, equality, and human rights.',
      slug: 'social-issues',
    },
    {
      id: '20',
      title: 'Celebrity News',
      description:
        'Gossip, rumors, and news about celebrities and pop culture.',
      slug: 'celebrity-news',
    },
  ],
};

const delayedFn =
  <T, A extends any[]>(fn: (...args: A) => T, ms: number) =>
  (...args: A) => {
    return new Promise<T>((resolve) =>
      setTimeout(() => resolve(fn(...args)), ms),
    );
  };

export const getUser = delayedFn(() => testData.users[0], 0);

export const getCategory = delayedFn(
  (id: string) => testData.categories.find((o) => o.id === id) || null,
  300,
);
export const getCategories = delayedFn(() => testData.categories || null, 300);

export const getStory = delayedFn(
  (id: string) =>
    testData.stories.find((j: StoryItem) => j.slug === id) || null,
  300,
);

export const getStories = delayedFn(
  (categoryId: string) =>
    testData.stories.filter((j: StoryItem) => j.categoryId === categoryId),
  300,
);

export const getAllStories = delayedFn(
  (
    page: number = 1,
    pageSize: number = PAGINATE_STORIES_LIMIT,
  ): StoryItem[] => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return testData.stories.slice(start, end);
  },
  300,
);
export const getMoreStories = delayedFn(() => testData.stories.slice(-2), 300); // get last item and -2 for the last two items

const findRelatedStories = (
  stories: StoryItem[],
  storyId: string,
  property: 'parent_stories' | 'children_stories',
): StoryItem[] => {
  const relatedStories: StoryItem[] = [];

  const findStories = (currentStoryId: string) => {
    stories.forEach((story) => {
      if (story.slug === currentStoryId && story[property].length > 0) {
        story[property].forEach((relatedId) => {
          const relatedStory = stories.find((s) => s.id === relatedId);
          if (relatedStory) {
            relatedStories.push(relatedStory);
            findStories(relatedStory.slug);
          }
        });
      }
    });
  };

  findStories(storyId);
  relatedStories.sort((a, b) => a.createdAt - b.createdAt); // Sort related stories by createdAt in ascending order
  return relatedStories;
};

export const getParentStories = delayedFn((storyId: string): StoryItem[] => {
  return findRelatedStories(testData.stories, storyId, 'parent_stories');
}, 300);

export const getChildrenStories = delayedFn((storyId: string): StoryItem[] => {
  return findRelatedStories(testData.stories, storyId, 'children_stories');
}, 300);

export const getRelatedStories = delayedFn((storyId: string): StoryItem[] => {
  let relatedStories: StoryItem[] = [];
  console.log(storyId);
  const theStory =
    testData.stories.find((j: StoryItem) => j.slug === storyId) || null;
  const parentStories = findRelatedStories(
    testData.stories,
    storyId,
    'parent_stories',
  );
  // console.log('parentStories', parentStories);
  const childrenStories = findRelatedStories(
    testData.stories,
    storyId,
    'children_stories',
  );
  // console.log('childrenStories', childrenStories);
  if (!theStory) return relatedStories;

  relatedStories = [
    ...parentStories,
    theStory,
    ...childrenStories,
  ] as StoryItem[];
  return relatedStories;
}, 300);

const paginateStories = (
  stories: StoryItem[],
  page: number,
  storiesPerPage: number,
): StoryItem[] => {
  const startIndex = (page - 1) * storiesPerPage;
  const endIndex = startIndex + storiesPerPage;
  return stories.slice(startIndex, endIndex);
};

const useTestData = <T>(promise: Promise<T>) => {
  const [testData, setTestData] = useState<T | null>(null);

  useEffect(() => {
    if (!testData) {
      promise.then(setTestData);
    }
  }, [promise, testData]);

  return { data: testData, isLoading: !testData };
};

export const useUser = () => useTestData(getUser());

export const useCategory = (id: string) => useTestData(getCategory(id));

export const useCategories = () => useTestData(getCategories());

export const useStory = (id: string) => useTestData(getStory(id));

export const useStories = (page: number, pageSize: number) =>
  useTestData(getAllStories(page, pageSize));

export const useParentStories = (id: string) =>
  useTestData(getParentStories(id));
export const useChildrenStories = (id: string) =>
  useTestData(getChildrenStories(id));
export const useRelatedStories = (id: string) =>
  useTestData(getRelatedStories(id));
