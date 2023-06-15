import { useEffect, useState } from 'react';

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
      title: 'New COVID-19 Variant Discovered in Lagos',
      body: 'Health officials in Lagos have identified a new COVID-19 variant with potential resistance to existing vaccines. The variant, named #LagosVariant, is believed to have originated from local transmission. Authorities are urging citizens to adhere to safety measures and get vaccinated.',
      categoryId: '1',
      createdAt: 1654305600,
      updatedAt: 1654305600,
    },
    {
      id: '2',
      title: 'Presidential Elections: Candidates Make Final Campaign Pitches',
      body: 'As Nigeria gears up for the upcoming presidential elections, candidates from various parties are making their final campaign pitches. Key issues being addressed include job creation, security, and infrastructure development. The nation eagerly awaits the election day results.',
      categoryId: '2',
      createdAt: 1654219200,
      updatedAt: 1654219200,
    },
    {
      id: '3',
      title: "Nigeria's Economy Shows Signs of Recovery",
      body: "After a challenging period, Nigeria's economy is showing signs of recovery. The recent growth in key sectors such as manufacturing, agriculture, and services indicates positive momentum. Experts believe this recovery will contribute to job creation and overall economic stability.",
      categoryId: '3',
      createdAt: 1654132800,
      updatedAt: 1654132800,
    },
    {
      id: '4',
      title: 'Tech Startup Launches Innovative Mobile Payment App',
      body: 'A Nigerian tech startup has launched an innovative mobile payment app, revolutionizing the way people conduct financial transactions. The app, named #EasyPay, offers secure and convenient payment solutions, empowering users to make purchases and transfers with ease.',
      categoryId: '4',
      createdAt: 1654046400,
      updatedAt: 1654046400,
    },
    {
      id: '5',
      title: 'Nigerian Scientist Discovers Potential Cure for Malaria',
      body: 'In a groundbreaking discovery, a Nigerian scientist has developed a potential cure for malaria. The new drug, undergoing clinical trials, shows promising results in effectively combating the disease. If successful, this breakthrough could save countless lives in malaria-endemic regions.',
      categoryId: '5',
      createdAt: 1653960000,
      updatedAt: 1653960000,
    },
    {
      id: '6',
      title: 'New Health Initiative Aims to Improve Maternal Care',
      body: 'A new health initiative has been launched to improve maternal care across Nigeria. The program, supported by the government and international organizations, focuses on providing quality healthcare services to expectant mothers, reducing maternal mortality rates, and ensuring safer childbirth experiences.',
      categoryId: '6',
      createdAt: 1653873600,
      updatedAt: 1653873600,
    },
    {
      id: '7',
      title: 'Nigeria Wins Gold in African Cup of Nations',
      body: 'The Nigerian national football team has emerged victorious in the African Cup of Nations, securing the gold medal. The team displayed exceptional skill and teamwork throughout the tournament, bringing pride and joy to the nation. Fans celebrate the well-deserved victory.',
      categoryId: '7',
      createdAt: 1653787200,
      updatedAt: 1653787200,
    },
    {
      id: '8',
      title: 'Nollywood Film Receives International Recognition',
      body: "A Nigerian film from the vibrant Nollywood industry has received international recognition at a prestigious film festival. The movie, #NaijaMagic, captivated audiences with its compelling storytelling and exceptional performances, solidifying Nigeria's position as a hub of creative talent.",
      categoryId: '8',
      createdAt: 1653700800,
      updatedAt: 1653700800,
    },
    {
      id: '9',
      title: 'Embracing Sustainable Fashion: Nigerian Designers Lead the Way',
      body: 'Nigerian fashion designers are taking a bold step towards sustainability, incorporating eco-friendly practices into their collections. By using ethically sourced materials and implementing innovative production techniques, these designers are leading the way towards a more environmentally conscious fashion industry.',
      categoryId: '9',
      createdAt: 1653614400,
      updatedAt: 1653614400,
    },
    {
      id: '10',
      title:
        "Exploring Nigeria's Hidden Gems: Idyllic Beaches and Cultural Heritage",
      body: 'Discover the hidden gems of Nigeria, from its pristine beaches along the coastline to its rich cultural heritage. Immerse yourself in the beauty of places like #LekkiBeach and #OlumoRock, experiencing the diverse traditions and warm hospitality that make Nigeria a captivating destination.',
      categoryId: '10',
      createdAt: 1653528000,
      updatedAt: 1653528000,
    },
    {
      id: '11',
      title: 'Savoring Nigerian Delicacies: From Jollof Rice to Suya',
      body: "Indulge in the flavors of Nigeria's cuisine, from the iconic Jollof Rice to the savory Suya. These dishes, loved by locals and appreciated globally, represent the country's rich culinary heritage. Explore the vibrant street food scene and traditional recipes that define Nigerian gastronomy.",
      categoryId: '11',
      createdAt: 1653441600,
      updatedAt: 1653441600,
    },
    {
      id: '12',
      title: 'Celebrating African Fashion: Nigerian Designers at the Forefront',
      body: 'Nigerian fashion designers continue to make waves in the global fashion scene, showcasing the richness of African textiles and design aesthetics. Their creations, adorned with vibrant prints and intricate details, exemplify the beauty and diversity of African fashion on a global platform.',
      categoryId: '12',
      createdAt: 1653355200,
      updatedAt: 1653355200,
    },
    {
      id: '13',
      title: 'Artistic Expressions: Nigerian Artists Push Boundaries',
      body: 'Nigerian artists are pushing boundaries and captivating audiences with their creative expressions. From contemporary art installations to traditional sculptures, their works reflect the vibrant cultural tapestry of Nigeria. Explore the world of Nigerian art and witness the power of artistic imagination.',
      categoryId: '13',
      createdAt: 1653268800,
      updatedAt: 1653268800,
    },
    {
      id: '14',
      title: 'Revolutionizing Education: Tech Solutions for Nigerian Schools',
      body: 'Innovative tech solutions are revolutionizing education in Nigeria, making learning more accessible and engaging. From e-learning platforms to virtual reality experiences, these tools are transforming the educational landscape, empowering students and educators with new ways to explore and acquire knowledge.',
      categoryId: '14',
      createdAt: 1653182400,
      updatedAt: 1653182400,
    },
    {
      id: '15',
      title: 'Preserving Natural Wonders: Conservation Efforts in Nigeria',
      body: "Conservation efforts in Nigeria are focused on preserving the country's natural wonders and biodiversity. From protecting wildlife sanctuaries to promoting sustainable practices, these initiatives aim to safeguard Nigeria's unique ecosystems for future generations to enjoy and appreciate.",
      categoryId: '15',
      createdAt: 1653096000,
      updatedAt: 1653096000,
    },
    {
      id: '16',
      title:
        'Unlocking Financial Freedom: Nigerian Startups Lead Fintech Revolution',
      body: 'Nigerian startups are at the forefront of the fintech revolution, offering innovative financial solutions to unlock economic opportunities. From mobile banking apps to peer-to-peer lending platforms, these startups are empowering individuals and businesses with convenient and secure financial services.',
      categoryId: '16',
      createdAt: 1653009600,
      updatedAt: 1653009600,
    },
    {
      id: '17',
      title: "Nigeria's Automotive Industry Gains Momentum",
      body: "Nigeria's automotive industry is gaining momentum, with domestic manufacturers producing quality vehicles and attracting global attention. The industry's growth is driving job creation and contributing to the nation's economic development, positioning Nigeria as a promising player in the automotive sector.",
      categoryId: '17',
      createdAt: 1652923200,
      updatedAt: 1652923200,
    },
    {
      id: '18',
      title: "Nigeria's Esports Scene Surges in Popularity",
      body: "Esports is gaining significant popularity in Nigeria, with a growing number of tournaments, professional teams, and passionate fans. The competitive gaming scene is providing opportunities for talented gamers and showcasing Nigeria's prowess in the world of virtual sports.",
      categoryId: '18',
      createdAt: 1652836800,
      updatedAt: 1652836800,
    },
    {
      id: '19',
      title: 'Advocating for Social Change: Nigerian Activists Stand Up',
      body: 'Nigerian activists are leading the charge for social change, addressing issues such as gender equality, human rights, and inclusivity. Their voices and actions are inspiring a generation to advocate for a more just and equitable society.',
      categoryId: '19',
      createdAt: 1652750400,
      updatedAt: 1652750400,
    },
    {
      id: '20',
      title: 'Inside the Lives of Nigerian Celebrities',
      body: 'Get an exclusive glimpse into the lives of Nigerian celebrities, from their rise to stardom to their philanthropic endeavors. Discover the stories behind their success and the impact they are making in the entertainment industry and beyond.',
      categoryId: '20',
      createdAt: 1652664000,
      updatedAt: 1652664000,
    },
    {
      id: '21',
      title: 'New Railway Infrastructure Connects Cities Across Nigeria',
      body: 'The completion of a new railway infrastructure project has significantly improved transportation connectivity across Nigeria. This development allows for faster and more efficient travel between major cities, boosting economic growth and facilitating easier movement of goods and people.',
      categoryId: '1',
      createdAt: 1652577600,
      updatedAt: 1652577600,
    },
    {
      id: '22',
      title: 'Youth Engagement in Politics: A Promising Trend',
      body: "An increasing number of Nigerian youths are actively engaging in politics, voicing their opinions, and seeking leadership roles. This trend signals a shift towards a more inclusive and representative political landscape, where the younger generation plays a vital role in shaping the country's future.",
      categoryId: '2',
      createdAt: 1652491200,
      updatedAt: 1652491200,
    },
    {
      id: '23',
      title: 'Solar Energy Solutions Brighten Rural Communities',
      body: 'Solar energy solutions are bringing light and power to remote rural communities in Nigeria. These sustainable initiatives provide electricity for homes, schools, and healthcare facilities, enhancing the quality of life and enabling economic opportunities in previously underserved areas.',
      categoryId: '3',
      createdAt: 1652404800,
      updatedAt: 1652404800,
    },
    {
      id: '24',
      title: 'Nigerian Tech Startup Raises Record-Breaking Funding',
      body: 'A Nigerian tech startup has recently secured record-breaking funding, positioning itself as a key player in the global tech industry. The investment will fuel innovation and expansion, further establishing Nigeria as a hub for groundbreaking technological advancements.',
      categoryId: '4',
      createdAt: 1652318400,
      updatedAt: 1652318400,
    },
    {
      id: '25',
      title: 'Empowering Women in STEM: Nigerian Trailblazers Lead the Way',
      body: 'Nigerian women in STEM (Science, Technology, Engineering, and Mathematics) are breaking barriers and shattering stereotypes. Their achievements and contributions in fields traditionally dominated by men inspire future generations of girls to pursue careers in STEM and drive innovation.',
      categoryId: '5',
      createdAt: 1652232000,
      updatedAt: 1652232000,
    },
    {
      id: '26',
      title: 'Promoting Mental Health Awareness in Nigeria',
      body: 'Efforts to promote mental health awareness in Nigeria are gaining traction, breaking the stigma surrounding mental health issues and providing support to those in need. Organizations and individuals are working together to prioritize mental well-being and ensure access to mental health services.',
      categoryId: '6',
      createdAt: 1652145600,
      updatedAt: 1652145600,
    },
    {
      id: '27',
      title:
        'Nigerian Athlete Wins Gold at International Track and Field Event',
      body: 'A Nigerian athlete has achieved a remarkable feat by winning a gold medal at a prestigious international track and field event. Their outstanding performance and dedication have brought pride to the nation and serve as an inspiration to aspiring athletes across the country.',
      categoryId: '7',
      createdAt: 1652059200,
      updatedAt: 1652059200,
    },
    {
      id: '28',
      title: 'Nollywood Actors Receive Global Recognition',
      body: "Nollywood actors are garnering global recognition for their exceptional talent and contribution to the film industry. Their performances in critically acclaimed movies have earned them accolades and invitations to prestigious international film festivals, further solidifying Nigeria's presence on the world cinema stage.",
      categoryId: '8',
      createdAt: 1651972800,
      updatedAt: 1651972800,
    },
    {
      id: '29',
      title: 'Traditional Nigerian Fashion Takes the Runway',
      body: 'Traditional Nigerian fashion is making waves on international runways, captivating fashion enthusiasts with its vibrant colors and intricate designs. Nigerian designers are showcasing the beauty and richness of traditional attire, merging cultural heritage with contemporary fashion trends.',
      categoryId: '9',
      createdAt: 1651886400,
      updatedAt: 1651886400,
    },
    {
      id: '30',
      title: "Exploring Nigeria's National Parks: Biodiversity Hotspots",
      body: "Immerse yourself in the breathtaking beauty of Nigeria's national parks, home to diverse ecosystems and abundant wildlife. From the iconic Yankari National Park to the enchanting Gashaka-Gumti National Park, these protected areas offer unparalleled opportunities for wildlife viewing and nature exploration.",
      categoryId: '10',
      createdAt: 1651800000,
      updatedAt: 1651800000,
    },
    {
      id: '31',
      title: 'Revitalizing Nigerian Cuisine: Fusion Flavors and Modern Twists',
      body: "Nigerian chefs and food entrepreneurs are revitalizing the country's cuisine, infusing traditional dishes with modern twists and experimenting with fusion flavors. From gourmet street food to upscale restaurants, these culinary innovators are putting Nigerian gastronomy on the global culinary map.",
      categoryId: '11',
      createdAt: 1651713600,
      updatedAt: 1651713600,
    },
    {
      id: '32',
      title: 'Promoting African Fashion: Nigerian Models Making an Impact',
      body: 'Nigerian models are making a significant impact on the African fashion industry, gracing international catwalks and magazine covers. Their diverse backgrounds and unique beauty challenge conventional beauty standards and celebrate the richness of African heritage in the global fashion arena.',
      categoryId: '12',
      createdAt: 1651627200,
      updatedAt: 1651627200,
    },
    {
      id: '33',
      title: 'Unveiling Nigerian Contemporary Art: Bold and Thought-Provoking',
      body: 'Nigerian contemporary artists are gaining recognition for their bold and thought-provoking works that challenge societal norms and explore complex themes. From mixed media installations to performance art, these artists push the boundaries of artistic expression, sparking meaningful conversations and reflections.',
      categoryId: '13',
      createdAt: 1651540800,
      updatedAt: 1651540800,
    },
    {
      id: '34',
      title: 'Digital Learning Revolutionizes Nigerian Education',
      body: 'Digital learning platforms and online education initiatives are revolutionizing the Nigerian education system, making quality education more accessible and inclusive. These digital tools empower students with personalized learning experiences and equip educators with innovative teaching resources.',
      categoryId: '14',
      createdAt: 1651454400,
      updatedAt: 1651454400,
    },
    {
      id: '35',
      title:
        "Conserving Nigeria's Forests: Protecting Biodiversity and Combatting Climate Change",
      body: "Efforts to conserve Nigeria's forests are crucial in preserving biodiversity and mitigating the impacts of climate change. Reforestation initiatives, sustainable logging practices, and community-led conservation projects contribute to the preservation of Nigeria's valuable forest ecosystems.",
      categoryId: '15',
      createdAt: 1651368000,
      updatedAt: 1651368000,
    },
    {
      id: '36',
      title: 'Fintech Innovations Drive Financial Inclusion in Nigeria',
      body: 'Fintech innovations are driving financial inclusion in Nigeria, providing access to banking services and empowering individuals and businesses. Mobile banking, digital wallets, and innovative payment solutions are transforming the financial landscape, ensuring that everyone has the opportunity to participate in the economy.',
      categoryId: '16',
      createdAt: 1651281600,
      updatedAt: 1651281600,
    },
    {
      id: '37',
      title: "Nigeria's Automotive Industry Embraces Electric Vehicles",
      body: "Nigeria's automotive industry is embracing the global shift towards electric vehicles (EVs), with increased investment and the development of EV manufacturing capabilities. This transition to cleaner and more sustainable transportation contributes to Nigeria's commitment to reduce carbon emissions and combat climate change.",
      categoryId: '17',
      createdAt: 1651195200,
      updatedAt: 1651195200,
    },
    {
      id: '38',
      title: 'Rise of Esports in Nigeria: Competing on the Global Stage',
      body: 'Esports has gained significant traction in Nigeria, with talented gamers competing on the global stage and representing the country in international tournaments. The growing esports community and supportive infrastructure are paving the way for Nigeria to become a prominent player in the esports industry.',
      categoryId: '18',
      createdAt: 1651108800,
      updatedAt: 1651108800,
    },
    {
      id: '39',
      title: 'Youth-Led Social Movements Bring Change to Nigeria',
      body: "Youth-led social movements in Nigeria are driving meaningful change, advocating for issues such as social justice, climate action, and good governance. Their activism and mobilization are reshaping the country's social and political landscape, inspiring a new generation of leaders.",
      categoryId: '19',
      createdAt: 1651022400,
      updatedAt: 1651022400,
    },
    {
      id: '40',
      title: 'The Rise of Nigerian Entertainment Influencers',
      body: 'Nigerian entertainment influencers are making a significant impact on social media platforms, shaping trends and engaging with millions of followers. From comedy skits to fashion hauls, these influencers are leveraging their online presence to entertain, inspire, and promote Nigerian talent and culture.',
      categoryId: '20',
      createdAt: 1650936000,
      updatedAt: 1650936000,
    },
    {
      id: '41',
      title: 'Connecting Nigeria: Infrastructure Projects Boost Transportation',
      body: 'Infrastructure projects in Nigeria are improving transportation connectivity, with the development of new roads, bridges, and airports. These initiatives facilitate smoother and more efficient movement of goods and people, enhancing economic growth and regional integration.',
      categoryId: '1',
      createdAt: 1650849600,
      updatedAt: 1650849600,
    },
    {
      id: '42',
      title: 'Youth Empowerment in Nigerian Politics: A Path to Change',
      body: 'Youth empowerment is playing a crucial role in Nigerian politics, as young individuals actively participate in political processes, demand accountability, and champion causes that resonate with their generation. Their engagement signifies a shifting political landscape and the potential for positive change.',
      categoryId: '2',
      createdAt: 1650763200,
      updatedAt: 1650763200,
    },
    {
      id: '43',
      title: "Harnessing Renewable Energy: Nigeria's Solar Revolution",
      body: "Nigeria's solar revolution is gaining momentum, with increased adoption of solar energy systems across the country. This shift towards renewable energy sources not only reduces reliance on fossil fuels but also provides clean and sustainable power to communities, businesses, and industries.",
      categoryId: '3',
      createdAt: 1650676800,
      updatedAt: 1650676800,
    },
    {
      id: '44',
      title: 'Nigerian Tech Startup Disrupts the Healthcare Industry',
      body: 'A Nigerian tech startup is disrupting the healthcare industry with innovative solutions that improve access to quality healthcare services. Through telemedicine, digital health records, and remote diagnostics, this startup is revolutionizing healthcare delivery and bridging the gap between healthcare providers and patients.',
      categoryId: '4',
      createdAt: 1650590400,
      updatedAt: 1650590400,
    },
    {
      id: '45',
      title: 'Breaking Gender Barriers: Nigerian Women Excelling in STEM',
      body: 'Nigerian women are breaking gender barriers and excelling in STEM fields, making significant contributions to science, technology, engineering, and mathematics. Their achievements inspire and empower future generations, fostering a more inclusive and diverse STEM workforce.',
      categoryId: '5',
      createdAt: 1650504000,
      updatedAt: 1650504000,
    },
    {
      id: '46',
      title: "Addressing Mental Health Stigma: Nigeria's Growing Awareness",
      body: "Nigeria's growing awareness of mental health issues is leading to a reduction in stigma and an increase in support systems. Mental health advocates, healthcare professionals, and community organizations are working together to promote understanding, access to treatment, and overall mental well-being.",
      categoryId: '6',
      createdAt: 1650417600,
      updatedAt: 1650417600,
    },
    {
      id: '47',
      title:
        'Nigerian Paralympic Athlete Inspires with Record-Breaking Performance',
      body: 'A Nigerian Paralympic athlete has made history by achieving a record-breaking performance and bringing home multiple medals. Their determination, resilience, and athletic prowess inspire individuals with disabilities and challenge societal perceptions of what is possible.',
      categoryId: '7',
      createdAt: 1650331200,
      updatedAt: 1650331200,
    },
    {
      id: '48',
      title: 'Nollywood Filmmakers Honored at International Film Awards',
      body: "Nollywood filmmakers are receiving international recognition and accolades at prestigious film awards, showcasing the industry's talent and creativity. These achievements contribute to the global appreciation of Nigerian cinema and its unique storytelling traditions.",
      categoryId: '8',
      createdAt: 1650244800,
      updatedAt: 1650244800,
    },
    {
      id: '49',
      title:
        'Promoting Nigerian Textile Traditions: A Return to Handcrafted Fashion',
      body: "Nigerian fashion designers are embracing traditional textile techniques and promoting handcrafted fashion. From adire to aso-oke, these designers celebrate Nigeria's rich textile heritage, supporting local artisans and creating sustainable fashion alternatives.",
      categoryId: '9',
      createdAt: 1650158400,
      updatedAt: 1650158400,
    },
    {
      id: '50',
      title: "Exploring Nigeria's Marine Reserves: Underwater Treasures",
      body: "Embark on an underwater adventure and explore Nigeria's marine reserves, teeming with vibrant coral reefs, diverse marine life, and shipwrecks. These protected areas offer unique opportunities for diving, snorkeling, and marine conservation activities.",
      categoryId: '10',
      createdAt: 1650072000,
      updatedAt: 1650072000,
    },
    {
      id: '51',
      title:
        'Innovative Nigerian Cuisine: Fusion Flavors and Culinary Experiments',
      body: 'Nigerian chefs and food entrepreneurs are pushing the boundaries of Nigerian cuisine, infusing traditional dishes with fusion flavors and experimenting with culinary techniques. These innovators are redefining Nigerian gastronomy and delighting taste buds with their creative and mouthwatering creations.',
      categoryId: '11',
      createdAt: 1649985600,
      updatedAt: 1649985600,
    },
    {
      id: '52',
      title: 'Nigerian Fashion Models Making a Global Impact',
      body: 'Nigerian fashion models are making waves on the global fashion scene, walking runways for renowned designers and gracing the covers of prestigious fashion magazines. Their unique beauty and confidence are redefining global beauty standards and showcasing the diversity of Nigerian talent.',
      categoryId: '12',
      createdAt: 1649899200,
      updatedAt: 1649899200,
    },
    {
      id: '53',
      title:
        'Nigerian Contemporary Art: Bold Expressions and Cultural Reflections',
      body: 'Nigerian contemporary artists are captivating audiences with their bold expressions and thought-provoking artworks. Through various mediums, they explore themes of identity, culture, and social issues, contributing to the vibrant and dynamic art scene in Nigeria and beyond.',
      categoryId: '13',
      createdAt: 1649812800,
      updatedAt: 1649812800,
    },
    {
      id: '54',
      title: 'E-Learning Revolution in Nigerian Education',
      body: 'The e-learning revolution is transforming Nigerian education, providing access to quality education through digital platforms and online learning resources. This shift enables students to learn at their own pace and enhances educational opportunities for individuals across the country.',
      categoryId: '14',
      createdAt: 1649726400,
      updatedAt: 1649726400,
    },
    {
      id: '55',
      title:
        "Protecting Nigeria's Forests: Conservation and Sustainable Practices",
      body: "Efforts to protect Nigeria's forests are increasing, focusing on conservation initiatives and promoting sustainable practices. These measures are essential for preserving biodiversity, mitigating climate change, and ensuring the well-being of local communities dependent on forest resources.",
      categoryId: '15',
      createdAt: 1649640000,
      updatedAt: 1649640000,
    },
    {
      id: '56',
      title: "Nigeria's Fintech Boom: Innovations in Financial Services",
      body: "Nigeria's fintech industry is experiencing a boom, with innovative solutions and digital platforms revolutionizing financial services. Mobile payment systems, peer-to-peer lending, and blockchain technology are reshaping the financial landscape and driving financial inclusion across the country.",
      categoryId: '16',
      createdAt: 1649553600,
      updatedAt: 1649553600,
    },
    {
      id: '57',
      title: "Nigeria's Transition to Electric Vehicles: A Green Revolution",
      body: 'Nigeria is embracing the transition to electric vehicles (EVs) as part of its commitment to a greener future. The adoption of EVs contributes to reduced carbon emissions, improved air quality, and a sustainable transportation system for the country.',
      categoryId: '17',
      createdAt: 1649467200,
      updatedAt: 1649467200,
    },
    {
      id: '58',
      title: "Nigeria's Emerging Esports Scene: Competing on the Global Stage",
      body: "Nigeria's esports scene is rapidly emerging, with talented gamers showcasing their skills and representing the country in international esports competitions. The growth of esports in Nigeria provides new opportunities for aspiring professional gamers and contributes to the country's presence in the global gaming community.",
      categoryId: '18',
      createdAt: 1649380800,
      updatedAt: 1649380800,
    },
    {
      id: '59',
      title:
        "Youth-Led Activism: Driving Change in Nigeria's Sociopolitical Landscape",
      body: 'Youth-led activism is playing a pivotal role in driving change and demanding social and political reforms in Nigeria. From advocating for good governance to fighting against corruption, these young activists are actively shaping the sociopolitical landscape of the country and inspiring others to join the movement.',
      categoryId: '19',
      createdAt: 1649294400,
      updatedAt: 1649294400,
    },
    {
      id: '60',
      title:
        'Promoting Nigerian Music Globally: Afrobeat Takes the World by Storm',
      body: 'Nigerian music, particularly the vibrant genre of Afrobeat, is gaining global recognition and popularity, with Nigerian artists collaborating with international musicians and topping global music charts. The infectious rhythms and rich cultural influences of Nigerian music have captivated audiences worldwide.',
      categoryId: '20',
      createdAt: 1649208000,
      updatedAt: 1649208000,
    },
    {
      id: '61',
      title:
        'Investing in Infrastructure: Enhancing Transportation Networks in Nigeria',
      body: 'Nigeria is investing in infrastructure development to enhance its transportation networks, including the construction of new roads, railways, and airports. These improvements aim to facilitate efficient movement of people and goods, boost economic growth, and promote regional integration.',
      categoryId: '1',
      createdAt: 1649121600,
      updatedAt: 1649121600,
    },
    {
      id: '62',
      title:
        "Youth Empowerment and Political Participation: Shaping Nigeria's Future",
      body: "Youth empowerment and political participation are crucial for shaping Nigeria's future, as young individuals actively engage in politics, advocate for their rights, and contribute to policymaking. Their involvement signifies a shift in the political landscape and the potential for positive change.",
      categoryId: '2',
      createdAt: 1649035200,
      updatedAt: 1649035200,
    },
    {
      id: '63',
      title: "Harnessing Solar Power: Nigeria's Renewable Energy Revolution",
      body: 'Nigeria is experiencing a renewable energy revolution, with the harnessing of solar power becoming increasingly prevalent. The deployment of solar energy systems not only reduces reliance on fossil fuels but also provides sustainable and affordable electricity to communities across the country.',
      categoryId: '3',
      createdAt: 1648948800,
      updatedAt: 1648948800,
    },
    {
      id: '64',
      title:
        'Revolutionizing Healthcare: Telemedicine and Digital Health in Nigeria',
      body: 'Telemedicine and digital health solutions are revolutionizing healthcare in Nigeria, improving access to medical services, and enabling remote consultations and diagnoses. These technological advancements have the potential to transform healthcare delivery and improve health outcomes for Nigerians.',
      categoryId: '4',
      createdAt: 1648862400,
      updatedAt: 1648862400,
    },
    {
      id: '65',
      title:
        "Promoting Gender Equality: Women's Empowerment Initiatives in Nigeria",
      body: "Various initiatives in Nigeria are promoting gender equality and women's empowerment, aiming to reduce gender disparities, enhance economic opportunities, and ensure equal rights and representation for women in all sectors of society. These efforts contribute to a more inclusive and equitable Nigeria.",
      categoryId: '5',
      createdAt: 1648776000,
      updatedAt: 1648776000,
    },
    {
      id: '66',
      title: 'Raising Mental Health Awareness: Breaking the Silence in Nigeria',
      body: 'Raising awareness about mental health issues is becoming increasingly important in Nigeria, as individuals and organizations work to break the silence and reduce stigma surrounding mental health. Through education, advocacy, and support networks, Nigeria is striving to prioritize mental well-being.',
      categoryId: '6',
      createdAt: 1648689600,
      updatedAt: 1648689600,
    },
    {
      id: '67',
      title: 'Nigerian Athletes Shine: Sporting Triumphs on the Global Stage',
      body: "Nigerian athletes continue to achieve remarkable sporting triumphs on the global stage, representing the country with pride and bringing home medals in various disciplines. Their dedication, talent, and resilience inspire aspiring athletes and contribute to Nigeria's sporting legacy.",
      categoryId: '7',
      createdAt: 1648603200,
      updatedAt: 1648603200,
    },
    {
      id: '68',
      title: "Nollywood's International Recognition: Nigerian Films Go Global",
      body: "Nollywood, Nigeria's vibrant film industry, is gaining international recognition and expanding its global reach. Nigerian films are captivating audiences worldwide with their storytelling, cultural richness, and talented actors, further establishing Nollywood as a major player in the global film industry.",
      categoryId: '8',
      createdAt: 1648516800,
      updatedAt: 1648516800,
    },
    {
      id: '69',
      title:
        "Reviving Indigenous Textile Crafts: Celebrating Nigeria's Cultural Heritage",
      body: 'Efforts to revive indigenous textile crafts are thriving in Nigeria, with a renewed appreciation for traditional weaving, dyeing, and embroidery techniques. These initiatives promote cultural heritage preservation, empower local artisans, and foster sustainable fashion practices.',
      categoryId: '9',
      createdAt: 1648430400,
      updatedAt: 1648430400,
    },
    {
      id: '70',
      title:
        "Discovering Nigeria's Hidden Gems: Ecotourism and Natural Wonders",
      body: "Nigeria's ecotourism sector is gaining attention, as travelers discover the country's hidden gems and natural wonders. From breathtaking waterfalls to lush national parks, these destinations offer unique experiences, promote environmental conservation, and support local communities.",
      categoryId: '10',
      createdAt: 1648344000,
      updatedAt: 1648344000,
    },
    {
      id: '71',
      title:
        'Exploring Nigerian Cuisine: Culinary Delights and Regional Specialties',
      body: "Nigerian cuisine is a melting pot of flavors, with diverse regional specialties that reflect the country's cultural diversity. From jollof rice to suya, exploring Nigerian cuisine is a culinary adventure that showcases the richness and complexity of the country's food traditions.",
      categoryId: '11',
      createdAt: 1648257600,
      updatedAt: 1648257600,
    },
    {
      id: '72',
      title:
        'Celebrating Nigerian Literature: Authors and Literary Achievements',
      body: 'Nigeria has a rich literary heritage, with renowned authors and literary achievements that have garnered international acclaim. From Chinua Achebe to Chimamanda Ngozi Adichie, Nigerian literature continues to captivate readers and contribute to the global literary landscape.',
      categoryId: '12',
      createdAt: 1648171200,
      updatedAt: 1648171200,
    },
    {
      id: '73',
      title:
        'Preserving Cultural Heritage: Museums and Historical Sites in Nigeria',
      body: "Nigeria is home to numerous museums and historical sites that preserve the country's rich cultural heritage and offer insights into its history and traditions. From the National Museum in Lagos to the ancient city of Benin, these sites serve as important educational and cultural hubs.",
      categoryId: '13',
      createdAt: 1648084800,
      updatedAt: 1648084800,
    },
    {
      id: '74',
      title:
        'Empowering Youth through Entrepreneurship: Startups and Innovation',
      body: 'Entrepreneurship is empowering Nigerian youth, with startups and innovation hubs providing opportunities for young entrepreneurs to turn their ideas into successful ventures. These initiatives drive economic growth, create job opportunities, and nurture a culture of innovation in Nigeria.',
      categoryId: '14',
      createdAt: 1647998400,
      updatedAt: 1647998400,
    },
    {
      id: '75',
      title:
        "Conserving Nigeria's Wildlife: Protecting Biodiversity and Habitats",
      body: "Conservation efforts in Nigeria are focused on protecting the country's diverse wildlife and preserving critical habitats. From endangered species to important ecosystems like the Niger Delta, these initiatives aim to safeguard biodiversity and promote sustainable development.",
      categoryId: '15',
      createdAt: 1647912000,
      updatedAt: 1647912000,
    },
    {
      id: '76',
      title: 'Transforming Agriculture: Technological Innovations in Farming',
      body: 'Technological innovations are transforming agriculture in Nigeria, improving farming practices, increasing productivity, and enhancing food security. From precision farming to mobile applications for farmers, these advancements are reshaping the agricultural sector and driving sustainable growth.',
      categoryId: '16',
      createdAt: 1647825600,
      updatedAt: 1647825600,
    },
    {
      id: '77',
      title:
        "Promoting Renewable Energy: Nigeria's Path to a Sustainable Future",
      body: 'Nigeria is actively promoting renewable energy sources as part of its commitment to a sustainable future. Solar, wind, and hydropower projects are being implemented to diversify the energy mix, reduce reliance on fossil fuels, and mitigate the impacts of climate change.',
      categoryId: '17',
      createdAt: 1647739200,
      updatedAt: 1647739200,
    },
    {
      id: '78',
      title: 'Empowering Artisans: Supporting Local Craftsmanship in Nigeria',
      body: 'Efforts to empower artisans and support local craftsmanship are thriving in Nigeria, as initiatives promote traditional skills and connect artisans with wider markets. From pottery to weaving, these endeavors preserve cultural heritage, foster economic growth, and promote sustainable livelihoods.',
      categoryId: '18',
      createdAt: 1647652800,
      updatedAt: 1647652800,
    },
    {
      id: '79',
      title: 'Driving Innovation in Education: EdTech Solutions in Nigeria',
      body: 'EdTech solutions are driving innovation in education in Nigeria, improving access to quality learning resources, facilitating remote learning, and enhancing teaching methodologies. These technological advancements have the potential to bridge educational gaps and empower the next generation of learners.',
      categoryId: '19',
      createdAt: 1647566400,
      updatedAt: 1647566400,
    },
    {
      id: '80',
      title:
        "Revitalizing Traditional Festivals: Showcasing Nigeria's Cultural Vibrancy",
      body: "Traditional festivals in Nigeria are being revitalized, providing platforms to showcase the country's cultural vibrancy and celebrate age-old traditions. From the Osun-Osogbo Festival to the Durbar Festival, these events attract both domestic and international visitors, fostering cultural exchange and tourism.",
      categoryId: '20',
      createdAt: 1647480000,
      updatedAt: 1647480000,
    },
    {
      id: '81',
      title: 'Transforming Urban Spaces: Sustainable City Planning in Nigeria',
      body: 'Sustainable city planning is transforming urban spaces in Nigeria, as cities prioritize green infrastructure, efficient transportation systems, and eco-friendly building practices. These initiatives aim to create livable, resilient cities that support the well-being of their residents and protect the environment.',
      categoryId: '1',
      createdAt: 1647393600,
      updatedAt: 1647393600,
    },
    {
      id: '82',
      title:
        'Promoting Financial Literacy: Empowering Nigerians for Financial Success',
      body: 'Efforts to promote financial literacy in Nigeria are empowering individuals with the knowledge and skills to make informed financial decisions, save money, and build wealth. Financial literacy programs and initiatives contribute to improved financial inclusion and economic stability in the country.',
      categoryId: '2',
      createdAt: 1647307200,
      updatedAt: 1647307200,
    },
    {
      id: '83',
      title:
        "Preserving Indigenous Languages: Safeguarding Nigeria's Linguistic Diversity",
      body: "Preserving indigenous languages is essential for safeguarding Nigeria's linguistic diversity and cultural heritage. Efforts to document and promote these languages contribute to the preservation of traditional knowledge, cultural identity, and intergenerational communication within local communities.",
      categoryId: '3',
      createdAt: 1647220800,
      updatedAt: 1647220800,
    },
    {
      id: '84',
      title:
        'Fostering Entrepreneurship: Incubators and Support Programs in Nigeria',
      body: 'Entrepreneurship incubators and support programs are fostering a culture of innovation and supporting aspiring entrepreneurs in Nigeria. These initiatives provide mentorship, funding opportunities, and access to resources, helping startups thrive and contribute to economic growth and job creation.',
      categoryId: '4',
      createdAt: 1647134400,
      updatedAt: 1647134400,
    },
    {
      id: '85',
      title:
        'Promoting Sustainable Fashion: Ethical and Eco-Friendly Practices',
      body: 'The fashion industry in Nigeria is embracing sustainable practices, promoting ethical production methods, and raising awareness about the environmental and social impact of fashion. From upcycling to supporting local artisans, sustainable fashion initiatives contribute to a more conscious and responsible industry.',
      categoryId: '5',
      createdAt: 1647048000,
      updatedAt: 1647048000,
    },
    {
      id: '86',
      title: "Harnessing Renewable Resources: Nigeria's Geothermal Potential",
      body: "Nigeria has significant geothermal potential that can be harnessed to generate clean, renewable energy. Geothermal power plants tap into the Earth's heat to produce electricity, offering a reliable and sustainable energy source that can contribute to Nigeria's energy transition and reduce carbon emissions.",
      categoryId: '6',
      createdAt: 1646961600,
      updatedAt: 1646961600,
    },
    {
      id: '87',
      title:
        "Promoting Cultural Exchange: Nigeria's International Art and Music Festivals",
      body: "Nigeria's international art and music festivals serve as platforms for cultural exchange, bringing together artists, musicians, and creatives from around the world. These events showcase Nigeria's diverse cultural expressions, foster artistic collaborations, and contribute to the global cultural landscape.",
      categoryId: '7',
      createdAt: 1646875200,
      updatedAt: 1646875200,
    },
    {
      id: '88',
      title:
        "Empowering Women in Tech: Closing the Gender Gap in Nigeria's Tech Industry",
      body: 'Efforts to empower women in the tech industry are gaining momentum in Nigeria, aiming to close the gender gap and promote gender diversity in the sector. Through mentorship programs, networking events, and skill-building initiatives, women are encouraged to pursue tech careers and excel in the field.',
      categoryId: '8',
      createdAt: 1646788800,
      updatedAt: 1646788800,
    },
    {
      id: '89',
      title:
        "Promoting Civic Engagement: Youth Participation in Nigeria's Democracy",
      body: "Youth participation in Nigeria's democracy is on the rise, as young people actively engage in political processes, advocate for their rights, and drive social change. Their voices and actions contribute to a more inclusive and representative democracy, shaping the country's future.",
      categoryId: '9',
      createdAt: 1646702400,
      updatedAt: 1646702400,
    },
    {
      id: '90',
      title: "Nigeria's Artistic Talent: Visual Arts and Contemporary Artists",
      body: 'Nigeria boasts a wealth of artistic talent, with visual arts and contemporary artists making a mark both nationally and internationally. From painting to sculpture, Nigerian artists express their creativity, challenge societal norms, and contribute to the global art scene with their unique perspectives.',
      categoryId: '10',
      createdAt: 1646616000,
      updatedAt: 1646616000,
    },
    {
      id: '91',
      title:
        'Empowering Rural Communities: Access to Clean Water and Sanitation',
      body: 'Access to clean water and sanitation is essential for empowering rural communities in Nigeria and improving public health. Initiatives focused on water infrastructure development, hygiene education, and sanitation facilities contribute to better living conditions and sustainable development in rural areas.',
      categoryId: '11',
      createdAt: 1646529600,
      updatedAt: 1646529600,
    },
    {
      id: '92',
      title: "Nigeria's Fashion Capitals: Lagos and Abuja as Style Hubs",
      body: "Lagos and Abuja have emerged as fashion capitals in Nigeria, showcasing the country's diverse fashion industry and hosting fashion weeks that attract designers, models, and fashion enthusiasts. These cities have become influential hubs for African fashion, fostering creativity and economic opportunities.",
      categoryId: '12',
      createdAt: 1646443200,
      updatedAt: 1646443200,
    },
    {
      id: '93',
      title:
        'Promoting Digital Inclusion: Bridging the Digital Divide in Nigeria',
      body: 'Efforts to promote digital inclusion in Nigeria aim to bridge the digital divide and ensure that all citizens have access to digital technologies and the internet. These initiatives encompass infrastructure development, digital literacy programs, and affordable connectivity, fostering a more inclusive and connected society.',
      categoryId: '13',
      createdAt: 1646356800,
      updatedAt: 1646356800,
    },
    {
      id: '94',
      title:
        'Reviving Traditional Crafts: Nigerian Artisans and Handmade Products',
      body: "Traditional crafts in Nigeria are experiencing a revival, as artisans create handmade products that showcase the country's cultural heritage and craftsmanship. From weaving to pottery, these traditional skills are celebrated and embraced, contributing to the preservation of cultural identity and economic empowerment.",
      categoryId: '14',
      createdAt: 1646270400,
      updatedAt: 1646270400,
    },
    {
      id: '95',
      title: 'Promoting Mental Health: Breaking the Stigma in Nigeria',
      body: 'Efforts to promote mental health in Nigeria aim to raise awareness, challenge stigmas, and improve access to mental healthcare services. Mental health advocacy, counseling centers, and support networks contribute to a more compassionate and supportive society that prioritizes well-being.',
      categoryId: '15',
      createdAt: 1646184000,
      updatedAt: 1646184000,
    },
    {
      id: '96',
      title: "Nigeria's Sports Excellence: Athletes and Achievements",
      body: "Nigeria has a rich sports legacy, with athletes excelling in various disciplines and representing the country at international competitions. From football to athletics, Nigerian sports stars inspire the nation, promote healthy lifestyles, and contribute to the country's sporting reputation on a global scale.",
      categoryId: '16',
      createdAt: 1646097600,
      updatedAt: 1646097600,
    },
    {
      id: '97',
      title: "Promoting Sustainable Tourism: Nigeria's Ecotourism Destinations",
      body: "Nigeria's ecotourism destinations offer unique experiences that showcase the country's natural beauty, biodiversity, and cultural heritage. From the Cross River National Park to the Ogbunike Caves, these destinations promote sustainable tourism practices and contribute to local economies and conservation efforts.",
      categoryId: '17',
      createdAt: 1646011200,
      updatedAt: 1646011200,
    },
    {
      id: '98',
      title:
        'Empowering Women in Agriculture: Driving Gender Equality in Rural Areas',
      body: "Efforts to empower women in agriculture aim to promote gender equality, increase women's access to resources and opportunities, and enhance their role in rural development. Women farmers contribute significantly to food security and sustainable agriculture in Nigeria, driving economic growth and social progress.",
      categoryId: '18',
      createdAt: 1645924800,
      updatedAt: 1645924800,
    },
    {
      id: '99',
      title: "Nollywood's Global Impact: Nigerian Film Industry",
      body: "Nigeria's film industry, popularly known as Nollywood, has gained global recognition for its vibrant storytelling, diverse narratives, and creative productions. Nollywood films have captivated audiences worldwide, contributing to the country's cultural influence and economic growth in the entertainment sector.",
      categoryId: '19',
      createdAt: 1645838400,
      updatedAt: 1645838400,
    },
    {
      id: '100',
      title: 'Promoting Sustainable Energy: Solar Power Initiatives in Nigeria',
      body: "Solar power initiatives in Nigeria are promoting sustainable energy solutions and reducing reliance on fossil fuels. Solar panels, solar farms, and off-grid solar systems contribute to the country's energy diversification, improve access to electricity in rural areas, and mitigate the effects of climate change.",
      categoryId: '20',
      createdAt: 1645752000,
      updatedAt: 1645752000,
    },
    {
      id: '101',
      title:
        'Innovative Healthcare Solutions: Tech-driven Medical Services in Nigeria',
      body: 'Innovative healthcare solutions in Nigeria leverage technology to improve medical services, enhance access to healthcare, and support efficient healthcare delivery. Telemedicine, health apps, and electronic health records contribute to better patient outcomes, particularly in remote areas with limited healthcare infrastructure.',
      categoryId: '1',
      createdAt: 1645665600,
      updatedAt: 1645665600,
    },
    {
      id: '102',
      title:
        'Promoting Financial Inclusion: Microfinance and Small Business Support',
      body: 'Microfinance institutions and small business support programs in Nigeria play a crucial role in promoting financial inclusion and empowering entrepreneurs. These initiatives provide access to capital, financial education, and business development services, enabling individuals to start and grow their businesses, create jobs, and improve livelihoods.',
      categoryId: '2',
      createdAt: 1645579200,
      updatedAt: 1645579200,
    },
    {
      id: '103',
      title:
        'Preserving Cultural Heritage: Museums and Historical Sites in Nigeria',
      body: "Museums and historical sites in Nigeria play a vital role in preserving the country's cultural heritage, artifacts, and historical narratives. From the National Museum of Nigeria to the Olumo Rock, these cultural institutions educate visitors, promote cultural appreciation, and contribute to tourism and national identity.",
      categoryId: '3',
      createdAt: 1645492800,
      updatedAt: 1645492800,
    },
    {
      id: '104',
      title: 'Driving Innovation in Agriculture: AgriTech Solutions in Nigeria',
      body: 'AgriTech solutions are driving innovation in agriculture in Nigeria, transforming farming practices, improving productivity, and enhancing food security. From precision farming to agricultural drones, these technological advancements contribute to sustainable agriculture, rural development, and economic growth in the agricultural sector.',
      categoryId: '4',
      createdAt: 1645406400,
      updatedAt: 1645406400,
    },
    {
      id: '105',
      title: "Promoting Gender Equality: Women's Empowerment in Nigeria",
      body: "Efforts to promote gender equality in Nigeria aim to empower women, eliminate discrimination, and ensure equal opportunities in all spheres of life. Women's empowerment programs, gender mainstreaming initiatives, and policy reforms contribute to a more equitable society that values and respects women's rights.",
      categoryId: '5',
      createdAt: 1645320000,
      updatedAt: 1645320000,
    },
    {
      id: '106',
      title: 'Improving Road Infrastructure: Enhancing Connectivity in Nigeria',
      body: 'Investments in road infrastructure are improving connectivity in Nigeria, facilitating trade, commerce, and regional integration. Road expansion, construction of new highways, and maintenance initiatives contribute to smoother transportation, reduced travel times, and enhanced economic development across the country.',
      categoryId: '6',
      createdAt: 1645233600,
      updatedAt: 1645233600,
    },
    {
      id: '107',
      title: 'Promoting Youth Entrepreneurship: Start-up Ecosystem in Nigeria',
      body: "Nigeria's start-up ecosystem is fostering youth entrepreneurship, supporting innovative ideas, and creating opportunities for young entrepreneurs. Incubation hubs, mentorship programs, and access to funding contribute to a thriving entrepreneurial culture, job creation, and economic growth in the country.",
      categoryId: '7',
      createdAt: 1645147200,
      updatedAt: 1645147200,
    },
    {
      id: '108',
      title: 'Preserving Natural Wonders: Conservation Efforts in Nigeria',
      body: "Conservation efforts in Nigeria focus on preserving the country's natural wonders, including wildlife, forests, and ecosystems. National parks, protected areas, and wildlife conservation initiatives contribute to biodiversity conservation, ecological balance, and sustainable development in Nigeria.",
      categoryId: '8',
      createdAt: 1645060800,
      updatedAt: 1645060800,
    },
    {
      id: '109',
      title: 'Promoting Quality Education: Access and Innovation in Nigeria',
      body: 'Efforts to promote quality education in Nigeria aim to improve access, enhance teaching and learning, and foster innovation in the education sector. Initiatives such as teacher training programs, digital learning platforms, and inclusive education practices contribute to equipping students with the skills and knowledge for a brighter future.',
      categoryId: '9',
      createdAt: 1644974400,
      updatedAt: 1644974400,
    },
    {
      id: '110',
      title: "Nigeria's Film Industry: From Nollywood to Global Recognition",
      body: "Nigeria's film industry, often referred to as Nollywood, has gained global recognition for its prolific output, unique storytelling, and cultural impact. Nollywood films resonate with audiences worldwide, contributing to Nigeria's soft power, creative economy, and cultural exchange across borders.",
      categoryId: '10',
      createdAt: 1644888000,
      updatedAt: 1644888000,
    },
    {
      id: '111',
      title: 'Promoting Sustainable Agriculture: Organic Farming in Nigeria',
      body: 'Organic farming practices in Nigeria promote sustainable agriculture, minimize environmental impact, and provide healthier food options. Organic farmers employ natural techniques, avoid synthetic pesticides and fertilizers, and prioritize soil health, contributing to sustainable food production and the preservation of ecosystem balance.',
      categoryId: '11',
      createdAt: 1644801600,
      updatedAt: 1644801600,
    },
    {
      id: '112',
      title:
        "Reviving Indigenous Languages: Preserving Nigeria's Linguistic Diversity",
      body: "Efforts to revive indigenous languages in Nigeria aim to preserve the country's rich linguistic diversity, cultural heritage, and identity. Language preservation initiatives, mother tongue education programs, and community-led language revitalization efforts contribute to preserving and celebrating Nigeria's linguistic heritage.",
      categoryId: '12',
      createdAt: 1644715200,
      updatedAt: 1644715200,
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

export const getStories = delayedFn(
  (categoryId: string) =>
    testData.stories.filter((j) => j.categoryId === categoryId),
  300,
);

export const getAllStories = delayedFn(() => testData.stories.slice(0, 4), 300);
export const getMoreStories = delayedFn(() => testData.stories.slice(-2), 300); // get last item and -2 for the last two items

export const getStory = delayedFn(
  (id: string) => testData.stories.find((j) => j.id === id) || null,
  300,
);

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

export const useStories = (categoryId: string) =>
  useTestData(getStories(categoryId));

export const useStory = (id: string) => useTestData(getStory(id));
