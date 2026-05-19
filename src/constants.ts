/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Event {
  id: string;
  date: Date;
  title: string;
  description: string;
  type: 'hero' | 'mission' | 'milestone';
  heroId?: string;
}

export const HEROES = [
  { id: 'iron-man', name: 'Tony Stark', alias: 'Iron Man', color: '#B71C1C' },
  { id: 'captain-america', name: 'Steve Rogers', alias: 'Captain America', color: '#0D47A1' },
  { id: 'thor', name: 'Thor Odinson', alias: 'Thor', color: '#FBC02D' },
  { id: 'hulk', name: 'Bruce Banner', alias: 'Hulk', color: '#2E7D32' },
  { id: 'black-widow', name: 'Natasha Romanoff', alias: 'Black Widow', color: '#212121' },
  { id: 'hawkeye', name: 'Clint Barton', alias: 'Hawkeye', color: '#4527A0' },
];

export const INITIAL_EVENTS: Event[] = [
  {
    id: '1',
    date: new Date(2026, 4, 1), // May 1st (as per current system time in turn)
    title: 'Avengers Initiative Anniversary',
    description: 'The day the team first assembled.',
    type: 'milestone',
  },
  {
    id: '2',
    date: new Date(2026, 4, 29),
    title: 'Iron Man Birthday',
    description: 'Celebrating the genius, billionaire, playboy, philanthropist.',
    type: 'hero',
    heroId: 'iron-man',
  },
  {
    id: '3',
    date: new Date(2026, 4, 15),
    title: 'Tactical Recon Mission',
    description: 'Coordinated surveillance in sector 4.',
    type: 'mission',
  }
];
