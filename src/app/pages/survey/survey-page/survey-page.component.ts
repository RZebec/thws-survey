import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';
import { routes as constRoutes } from '../../../consts/routes';
import { MatStepper } from '@angular/material/stepper';

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
      question: 'overall_usability',
      hint: 'overall_usability_hint',
      numericValue: 0,
    },
    {
      question: 'intuitive_interface',
      hint: 'intuitive_interface_hint',
      numericValue: 0,
    },
    {
      question: 'visual_appeal',
      hint: 'visual_appeal_hint',
      numericValue: 0,
    },
    {
      question: 'meeting_expectations',
      hint: 'meeting_expectations_hint',
      numericValue: 0,
    },
    {
      question: 'responsiveness_speed',
      hint: 'responsiveness_speed_hint',
      numericValue: 0,
    },
    {
      question: 'organize_display_tasks',
      hint: 'organize_display_tasks_hint',
      numericValue: 0,
    },
    {
      question: 'useful_features',
      textValue: '',
    },
    {
      question: 'overall_satisfaction',
      hint: 'overall_satisfaction_hint',
      numericValue: 0,
    },
    {
      question: 'future_usage_likelihood',
      hint: 'future_usage_likelihood_hint',
      numericValue: 0,
    },
    {
      question: 'additional_comments',
      textValue: '',
    },
  ];
  surveyDetails: Survey[] = [
    {
      question: 'PREVIOUS_EXPERIENCE',
      selectValue: '',
      options: ['YES', 'NO'],
    },
    {
      question: 'FREQUENCY_APP_USAGE',
      selectValue: '',
      options: ['RARELY', 'OCCASIONALLY', 'FREQUENTLY', 'DAILY'],
    },
    {
      question: 'PREFERRED_DEVICE',
      selectValue: '',
      options: ['SMARTPHONE', 'TABLET', 'COMPUTER', 'OTHER'],
    },
  ];

  constructor(
    private databaseService: DatabaseService,
    private router: Router
  ) {}

  submitToDo(stepper: MatStepper) {
    this.submittedToDo = true;
    console.log(this.surveyToDo);

    if (this.surveyToDo.filter((q) => q.numericValue === 0).length === 0)
      stepper.next();
  }

  async submitDetails() {
    this.submittedDetails = true;
    console.log(this.surveyDetails);

    if (this.checkSurveys()) {
      console.log('Check successful');
      this.databaseService.submitToDoSurvey(this.surveyToDo);
      this.databaseService.submitDetailsSurvey(this.surveyDetails);
      this.databaseService.updateUserStep(3);
      this.router.navigateByUrl(constRoutes.DONE);
    }
  }

  checkSurveys(): boolean {
    if (this.surveyToDo.filter((q) => q.numericValue === 0).length > 0)
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
