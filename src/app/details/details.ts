import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details {
  activeTab: string = 'eligibility';

  eligibilityRequirements = [
    {
      number: 1,
      text: 'Minimum of a second division in English and Maths or Computer (either computer or Maths) with complete marks of 100/100 at any TU acknowledged institution at the +2 level.'
    },
    {
      number: 2,
      text: 'Higher secondary or secondary school of any faculty on Grade 11 and 12 or equivalent exams in English and Maths or Computer subject with 100/100 full marks with C Grade on English and Maths or Computer (Must be either Computer or Maths) and a minimum Grade Point of 16 on other subjects and a CGPA of 1.8.'
    },
    {
      number: 3,
      text: 'In A Level exams, students must obtain a minimum grade of D (with or without a small letter) with full marks of 100/100 in English and Maths or Computer.'
    },
    {
      number: 4,
      text: 'CTEVT three-year diploma students must have a minimum of a second division in English and Math or Computer subjects, with 100/100 full marks.'
    }
  ];

  semesters = [
    {
      name: 'First Semester',
      courses: [
        'BIT 101 - Introduction To Information Technology',
        'BIT 102 - C Programming',
        'BIT 103 - Digital Logic',
        'MTH 104 - Basic Mathematics',
        'SCO 105 - Sociology'
      ]
    },
    {
      name: 'Second Semester',
      courses: [
        'BIT 151 - Microprocessor And Computer Architecture',
        'BIT 152 - Discrete Structure',
        'BIT 153 - Object Oriented Programming',
        'STA 154 - Basic Statistics',
        'ECO 155 - Economics'
      ]
    },
    {
      name: 'Third Semester',
      courses: [
        'BIT 201 - Data Structure And Algorithms',
        'BIT 202 - Database Management System',
        'BIT 203 - Numerical Methods',
        'BIT 204 - Operating System',
        'MGT 205 - Principles Of Management'
      ]
    },
    {
      name: 'Fourth Semester',
      courses: [
        'BIT 251 - Web Technology I',
        'BIT 252 - Artificial Intelligence',
        'BIT 254 - System Analysis And Design',
        'BIT 255 - Network And Data Communications',
        'ORS 255 - Operations Research'
      ]
    },
    {
      name: 'Fifth Semester',
      courses: [
        'BIT 301 - Web Technology II',
        'BIT 302 - Software Engineering',
        'BIT 303 - Information Security',
        'BIT 304 - Computer Graphics',
        'ENG 305 - Technical Writing'
      ]
    },
    {
      name: 'Sixth Semester',
      courses: [
        'BIT 351 - Net-Centric Computing',
        'BIT 352 - Database Administration',
        'BIT 353 - Management Information System',
        'RSM 354 - Research Methodology',
        'Elective I'
      ]
    },
    {
      name: 'Seventh Semester',
      courses: [
        'BIT 401 - Advanced Java Programming',
        'BIT 402 - Software Project Management',
        'BIT 403 - E-Commerce',
        'BIT 404 - Project Work',
        'Elective II'
      ]
    },
    {
      name: 'Eighth Semester',
      courses: [
        'BIT 451 - Network System Administration',
        'BIT 452 - E-Governance',
        'BIT 453 - Internship',
        'Elective III'
      ]
    }
  ];

  electives = [
    {
      name: 'Elective I',
      courses: [
        'BIT 355 - Geographical Information System',
        'BIT 356 - Multimedia Computing',
        'BIT 357 - Wireless Networking',
        'BIT 358 - Society And Ethics in IT',
        'PSY 359 - Psychology'
      ]
    },
    {
      name: 'Elective II',
      courses: [
        'BIT 405 - DSS And Expert System',
        'BIT 406 - Mobile Application Development',
        'BIT 407 - Simulation And Modeling',
        'BIT 408 - Cloud Computing',
        'MGT 409 - Marketing'
      ]
    },
    {
      name: 'Elective III',
      courses: [
        'BIT 454 - Data Warehousing And Data Mining',
        'BIT 455 - Knowledge Management',
        'BIT 456 - Image Processing',
        'BIT 457 - Network Security',
        'BIT 458 - Introduction To Telecommunications'
      ]
    }
  ];

  colleges = [
    {
      name: 'Amrit Science Campus (ASCOL)',
      location: 'Lainchaur, Kathmandu',
      seats:'Seats: 36',
      image: 'https://www.bitinfonepal.com/colleges/Amrit%20Science%20Campus%20ASCOL%20bitinfoNepal.webp',
    },
    {
      name: 'Patan Multiple Campus',
      location: 'Patan Dhoka, Lalitpur ',
      seats:'Seats: 72',
       image: 'https://www.bitinfonepal.com/colleges/Patan%20Multiple%20Campus%20bitinfoNepal.webp',
     
    },
    {
      name: 'Bhaktapur Multiple Campus ',
      location: 'Doodhpati-17, Doodhpati, Bhaktapur',
       seats:'Seats: 72',
       image: 'https://www.bitinfonepal.com/colleges/Bhaktapur%20Multiple%20Campus%20bitinfoNepal.webp',
     
    },
    {
      name: 'Padma Kanya Multiple Campus',
      location: 'Bagbazar, Kathmandu',
      seats:'Seats: 36',
      image: 'https://www.bitinfonepal.com/colleges/Padma%20Kanya%20Multiple%20Campus%20bitinfoNepal.webp',
      
    },{
      name: 'Central Campus of Technology',
      location: 'Hattisar, Dharan, Sunsari ',
      seats:'Seats: 36',
      image: 'https://www.bitinfonepal.com/colleges/Central%20Campus%20of%20Technology%20bitinfoNepal.webp',
   
    },
    {
      name: 'Siddhanath Science Campus',
      location: 'Mahendranagar,Kanchanpur',
      seats:'Seats: 36',
      image: 'https://www.bitinfonepal.com/colleges/Siddhanath%20Science%20Campus%20bitinfoNepal.webp',
     
    },
    {
      name: 'Thakur Ram Multiple Campus',
      location: 'Birgunj, Parsa ',
      seats:'Seats: 36',
      image: 'https://www.bitinfonepal.com/colleges/Thakur%20Ram%20Multiple%20Campus%20bitinfoNepal.webp',
   
    },
    {
      name: 'Bhairahawa Multiple Campus',
      location: 'Bhairahawa',
      seats:'Seats: 36',
      image: 'https://www.bitinfonepal.com/colleges/Bhairahawa%20Multiple%20Campus%20bitinfoNepal.webp',
    
    },
    {
      name: 'Birendra Multiple Campus',
      location: 'Bharatpur, Chitwan ',
      seats:'Seats: 36',
      image: 'https://www.bitinfonepal.com/colleges/Birendra%20Multiple%20Campus%20bitinfoNepal.webp',
      
    },
    {
      name: 'Mahendra Multiple Campus,Nepalgunj',
      location: 'Bhansar Road, Nepalgunj, Banke',
      seats:'Seats: 36',
      image: 'https://www.bitinfonepal.com/colleges/Mahendra%20Multiple%20Campus%20Nepalgunj%20bitinfoNepal.webp',
   
    }
    ,{
      name: 'Ramsworup Ramsagar Multiple',
      location: 'Janakpur, Dhanusha ',
      seats:'Seats: 36',
      image: 'https://www.bitinfonepal.com/colleges/Ramsworup%20Ramsagar%20Multiple%20Campus%20bitinfoNepal.webp',
      
    }
    ,
    {
      name: 'Mahendra Morang Adarsha Multiple Campus',
      location: 'Roadcyes Chowk, Biratnagar- 16 Morang',
      seats:'Seats: 36',
      image: 'https://www.bitinfonepal.com/colleges/Mahendra%20Morang%20Adarsha%20Multiple%20Campus%20bitinfoNepal.webp',
  
    },
     {
      name: 'Degree Campus',
      location: 'Purano Hawai Field, Biratnagar',
     seats:'Seats: 36',
      image: 'https://www.bitinfonepal.com/colleges/degree%20campus%20bitinfoNepal.webp',
     
    },
     {
      name: 'mahendra bindeshwari multiple Campus',
     seats:'Seats: 36',
      image: 'https://www.bitinfonepal.com/colleges/mahendra%20bindeshwari%20bitinfoNepal.webp',
     
    },
     {
      name: 'Surya Narayana Satya Narayan Multiple Campus',
      location: 'Taleshwar Marg, Siraha ',
     seats:'Seats: 36',
      image: 'https://www.bitinfonepal.com/colleges/suryanarayan%20satyanarayan%20bitinfoNepal.webp',
     
    },
  ];

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }
}