import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { routes as constRoutes } from '../../../consts/routes';

@Component({
  selector: 'app-survey-page',
  templateUrl: './survey-page.component.html',
  styleUrls: ['./survey-page.component.scss'],
})
export class SurveyPageComponent {
  submittedToDo = false;
  submittedDetails = false;

  surveyToDo: Survey[] = [
    {
      question:
        'On a scale of 1 to 5, please rate the overall usability of the todo app.',
      hint: '1 - Very difficult to use, 2 - Difficult to use, 3 - Neutral, 4 - Easy to use, 5 - Very easy to use',
      numericValue: 0,
    },
    {
      question:
        "How intuitive was the app's interface for adding, managing, and updating tasks?",
      hint: '1 - Not intuitive at all, 2 - Somewhat unintuitive, 3 - Neutral, 4 - Somewhat intuitive, 5 - Very intuitive',
      numericValue: 0,
    },
    {
      question: 'How visually appealing was the design of the app?',
      hint: '1 - Very unappealing, 2 - Somewhat unappealing, 3 - Neutral, 4 - Somewhat appealing, 5 - Very appealing',
      numericValue: 0,
    },
    {
      question:
        'How well did the app meet your expectations in terms of fulfilling your task management needs?',
      hint: '1 - Not at all, 2 - Somewhat, 3 - Neutral, 4 - Mostly, 5 - Completely',
      numericValue: 0,
    },
    {
      question:
        "On a scale of 1 to 5, please rate the app's responsiveness and speed.",
      hint: '1 - Very slow, 2 - Slow, 3 - Neutral, 4 - Fast, 5 - Very fast',
      numericValue: 0,
    },
    {
      question: 'How well did the app organize and display your tasks?',
      hint: '1 - Very poorly, 2 - Poorly, 3 - Neutral, 4 - Well, 5 - Very well',
      numericValue: 0,
    },
    {
      question:
        'Were there any features or functionalities that you found particularly useful or impressive?',
      textValue: '',
    },
    {
      question:
        'On a scale of 1 to 5, please rate your overall satisfaction with the todo app.',
      hint: '1 - Very dissatisfied, 2 - Dissatisfied, 3 - Neutral, 4 - Satisfied, 5 - Very satisfied',
      numericValue: 0,
    },
    {
      question: 'How likely are you to continue using the app in the future?',
      hint: '1 - Very unlikely, 2 - Unlikely, 3 - Neutral, 4 - Likely, 5 - Very likely',
      numericValue: 0,
    },
    {
      question:
        'Do you have any additional comments, suggestions, or feedback regarding the todo app and its user experience?',
      textValue: '',
    },
  ];

  surveyDetails: Survey[] = [
    {
      question: 'Age',
      selectValue: '',
      options: Array.from({ length: 70 }, (_, index) => (index + 1).toString()),
    },
    {
      question: 'Gender',
      selectValue: '',
      options: ['Male', 'Female', 'Other'],
    },
    {
      question: 'Country of Residency',
      selectValue: '',
      options: countryList,
    },
  ];

  constructor(
    private databaseService: DatabaseService,
    private router: Router
  ) {}

  submitToDo() {
    this.submittedToDo = true;
    console.log(this.surveyToDo);
  }

  async submitDetails() {
    this.submittedDetails = true;
    console.log(this.surveyDetails);

    if (this.checkSurveys()) {
      await this.databaseService.submitToDoSurvey(this.surveyToDo);
      await this.databaseService.submitDetailsSurvey(this.surveyDetails);
      await this.databaseService.updateUserStep(3);
      this.router.navigateByUrl(constRoutes.DONE);
    }
  }

  checkSurveys(): boolean {
    if (this.surveyToDo.filter((q) => q.numericValue === 0).length > 0)
      return false;
    if (this.surveyToDo.filter((q) => q.selectValue === '').length > 0)
      return false;

    if (this.surveyDetails.filter((q) => q.numericValue === 0).length > 0)
      return false;
    if (this.surveyDetails.filter((q) => q.selectValue === '').length > 0)
      return false;
    if (this.surveyDetails.filter((q) => q.ageValue === 0).length > 0)
      return false;

    return true;
  }
}

export interface Survey {
  question: string;
  hint?: string;
  numericValue?: number;
  ageValue?: number;
  textValue?: string;
  options?: string[];
  selectValue?: string;
}

const countryList = [
  'Afghanistan',
  'Albania',
  'Algeria',
  'American Samoa',
  'Andorra',
  'Angola',
  'Anguilla',
  'Antarctica',
  'Antigua and Barbuda',
  'Argentina',
  'Armenia',
  'Aruba',
  'Australia',
  'Austria',
  'Azerbaijan',
  'Bahamas (the)',
  'Bahrain',
  'Bangladesh',
  'Barbados',
  'Belarus',
  'Belgium',
  'Belize',
  'Benin',
  'Bermuda',
  'Bhutan',
  'Bolivia (Plurinational State of)',
  'Bonaire, Sint Eustatius and Saba',
  'Bosnia and Herzegovina',
  'Botswana',
  'Bouvet Island',
  'Brazil',
  'British Indian Ocean Territory (the)',
  'Brunei Darussalam',
  'Bulgaria',
  'Burkina Faso',
  'Burundi',
  'Cabo Verde',
  'Cambodia',
  'Cameroon',
  'Canada',
  'Cayman Islands (the)',
  'Central African Republic (the)',
  'Chad',
  'Chile',
  'China',
  'Christmas Island',
  'Cocos (Keeling) Islands (the)',
  'Colombia',
  'Comoros (the)',
  'Congo (the Democratic Republic of the)',
  'Congo (the)',
  'Cook Islands (the)',
  'Costa Rica',
  'Croatia',
  'Cuba',
  'Curaçao',
  'Cyprus',
  'Czechia',
  "Côte d'Ivoire",
  'Denmark',
  'Djibouti',
  'Dominica',
  'Dominican Republic (the)',
  'Ecuador',
  'Egypt',
  'El Salvador',
  'Equatorial Guinea',
  'Eritrea',
  'Estonia',
  'Eswatini',
  'Ethiopia',
  'Falkland Islands (the) [Malvinas]',
  'Faroe Islands (the)',
  'Fiji',
  'Finland',
  'France',
  'French Guiana',
  'French Polynesia',
  'French Southern Territories (the)',
  'Gabon',
  'Gambia (the)',
  'Georgia',
  'Germany',
  'Ghana',
  'Gibraltar',
  'Greece',
  'Greenland',
  'Grenada',
  'Guadeloupe',
  'Guam',
  'Guatemala',
  'Guernsey',
  'Guinea',
  'Guinea-Bissau',
  'Guyana',
  'Haiti',
  'Heard Island and McDonald Islands',
  'Holy See (the)',
  'Honduras',
  'Hong Kong',
  'Hungary',
  'Iceland',
  'India',
  'Indonesia',
  'Iran (Islamic Republic of)',
  'Iraq',
  'Ireland',
  'Isle of Man',
  'Israel',
  'Italy',
  'Jamaica',
  'Japan',
  'Jersey',
  'Jordan',
  'Kazakhstan',
  'Kenya',
  'Kiribati',
  "Korea (the Democratic People's Republic of)",
  'Korea (the Republic of)',
  'Kuwait',
  'Kyrgyzstan',
  "Lao People's Democratic Republic (the)",
  'Latvia',
  'Lebanon',
  'Lesotho',
  'Liberia',
  'Libya',
  'Liechtenstein',
  'Lithuania',
  'Luxembourg',
  'Macao',
  'Madagascar',
  'Malawi',
  'Malaysia',
  'Maldives',
  'Mali',
  'Malta',
  'Marshall Islands (the)',
  'Martinique',
  'Mauritania',
  'Mauritius',
  'Mayotte',
  'Mexico',
  'Micronesia (Federated States of)',
  'Moldova (the Republic of)',
  'Monaco',
  'Mongolia',
  'Montenegro',
  'Montserrat',
  'Morocco',
  'Mozambique',
  'Myanmar',
  'Namibia',
  'Nauru',
  'Nepal',
  'Netherlands (the)',
  'New Caledonia',
  'New Zealand',
  'Nicaragua',
  'Niger (the)',
  'Nigeria',
  'Niue',
  'Norfolk Island',
  'Northern Mariana Islands (the)',
  'Norway',
  'Oman',
  'Pakistan',
  'Palau',
  'Palestine, State of',
  'Panama',
  'Papua New Guinea',
  'Paraguay',
  'Peru',
  'Philippines (the)',
  'Pitcairn',
  'Poland',
  'Portugal',
  'Puerto Rico',
  'Qatar',
  'Republic of North Macedonia',
  'Romania',
  'Russian Federation (the)',
  'Rwanda',
  'Réunion',
  'Saint Barthélemy',
  'Saint Helena, Ascension and Tristan da Cunha',
  'Saint Kitts and Nevis',
  'Saint Lucia',
  'Saint Martin (French part)',
  'Saint Pierre and Miquelon',
  'Saint Vincent and the Grenadines',
  'Samoa',
  'San Marino',
  'Sao Tome and Principe',
  'Saudi Arabia',
  'Senegal',
  'Serbia',
  'Seychelles',
  'Sierra Leone',
  'Singapore',
  'Sint Maarten (Dutch part)',
  'Slovakia',
  'Slovenia',
  'Solomon Islands',
  'Somalia',
  'South Africa',
  'South Georgia and the South Sandwich Islands',
  'South Sudan',
  'Spain',
  'Sri Lanka',
  'Sudan (the)',
  'Suriname',
  'Svalbard and Jan Mayen',
  'Sweden',
  'Switzerland',
  'Syrian Arab Republic',
  'Taiwan',
  'Tajikistan',
  'Tanzania, United Republic of',
  'Thailand',
  'Timor-Leste',
  'Togo',
  'Tokelau',
  'Tonga',
  'Trinidad and Tobago',
  'Tunisia',
  'Turkey',
  'Turkmenistan',
  'Turks and Caicos Islands (the)',
  'Tuvalu',
  'Uganda',
  'Ukraine',
  'United Arab Emirates (the)',
  'United Kingdom of Great Britain and Northern Ireland (the)',
  'United States Minor Outlying Islands (the)',
  'United States of America (the)',
  'Uruguay',
  'Uzbekistan',
  'Vanuatu',
  'Venezuela (Bolivarian Republic of)',
  'Viet Nam',
  'Virgin Islands (British)',
  'Virgin Islands (U.S.)',
  'Wallis and Futuna',
  'Western Sahara',
  'Yemen',
  'Zambia',
  'Zimbabwe',
  'Åland Islands',
];
