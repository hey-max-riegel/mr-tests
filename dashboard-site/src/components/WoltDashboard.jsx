import React, { useState, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

const rawData = `Restaurant,Date,Time,Amount,Year,Month,Day,DayOfWeek,Hour,Cuisine
Marmarita,2021-06-13,12:25,19.90,2021,6,13,Sunday,12,Middle Eastern
MERCOSY Friedrichshain,2021-06-12,18:49,23.15,2021,6,12,Saturday,18,Mixed
Bombay,2021-06-02,07:18,19.30,2021,6,2,Wednesday,7,Indian
Bombay,2021-06-01,12:14,25.70,2021,6,1,Tuesday,12,Indian
Hito Falafel,2021-05-29,18:50,19.90,2021,5,29,Saturday,18,Middle Eastern
Hito Falafel,2021-05-26,19:59,19.90,2021,5,26,Wednesday,19,Middle Eastern
The Fresh Seeds Mitte,2021-05-24,18:18,16.80,2021,5,24,Monday,18,Healthy
Hito Falafel,2021-05-24,11:59,28.90,2021,5,24,Monday,11,Middle Eastern
Bombay,2021-05-23,18:01,26.70,2021,5,23,Sunday,18,Indian
Bombay,2021-05-10,18:59,21.70,2021,5,10,Monday,18,Indian
Nil Friedrichshain,2021-06-28,18:29,14.90,2021,6,28,Monday,18,Mixed
Marmarita,2021-06-27,12:49,24.20,2021,6,27,Sunday,12,Middle Eastern
Maison Umami,2021-06-25,18:06,16.90,2021,6,25,Friday,18,Asian Fusion
Marmarita,2021-06-25,11:50,16.40,2021,6,25,Friday,11,Middle Eastern
Lovely,2021-06-23,18:49,18.00,2021,6,23,Wednesday,18,Mixed
Marmarita,2021-06-22,12:52,16.40,2021,6,22,Tuesday,12,Middle Eastern
Salsabil 3 Friedrichshain,2021-06-19,14:00,17.00,2021,6,19,Saturday,14,Middle Eastern
Marmarita,2021-06-18,19:08,16.40,2021,6,18,Friday,19,Middle Eastern
The Hummusapiens,2021-06-17,17:49,15.90,2021,6,17,Thursday,17,Middle Eastern
Marmarita,2021-06-15,19:18,16.40,2021,6,15,Tuesday,19,Middle Eastern
Marmarita,2021-07-26,19:17,16.40,2021,7,26,Monday,19,Middle Eastern
Marmarita,2021-07-10,13:18,21.30,2021,7,10,Saturday,13,Middle Eastern
Marmarita,2021-07-09,13:02,20.32,2021,7,9,Friday,13,Middle Eastern
Marmarita,2021-07-08,12:32,25.60,2021,7,8,Thursday,12,Middle Eastern
Marmarita,2021-07-05,18:45,16.40,2021,7,5,Monday,18,Middle Eastern
Salsabil 3 Friedrichshain,2021-07-04,11:50,18.90,2021,7,4,Sunday,11,Middle Eastern
House of Do An,2021-07-03,18:18,14.80,2021,7,3,Saturday,18,Vietnamese
Marmarita,2021-07-03,13:52,25.20,2021,7,3,Saturday,13,Middle Eastern
Seth Restaurant,2021-07-02,18:30,15.40,2021,7,2,Friday,18,Middle Eastern
Marmarita,2021-07-01,19:25,16.40,2021,7,1,Thursday,19,Middle Eastern
Marmarita,2021-06-29,19:56,16.40,2021,6,29,Tuesday,19,Middle Eastern
JAPA,2021-09-17,12:23,17.00,2021,9,17,Friday,12,Japanese
Mmaah Korean BBQ Express,2021-08-15,17:51,16.29,2021,8,15,Sunday,17,Korean
TAT Restaurant,2021-08-14,18:16,16.40,2021,8,14,Saturday,18,Thai
Huakai Bowl Bar,2021-08-13,19:32,14.40,2021,8,13,Friday,19,Hawaiian
Huakai Bowl Bar,2021-08-10,18:33,14.40,2021,8,10,Tuesday,18,Hawaiian
Ristorante Sole,2021-08-08,12:24,25.40,2021,8,8,Sunday,12,Italian
Marmarita,2021-08-06,12:43,16.40,2021,8,6,Friday,12,Middle Eastern
Salsabil 3 Friedrichshain,2021-08-04,19:41,12.90,2021,8,4,Wednesday,19,Middle Eastern
Marmarita,2021-08-01,12:52,16.40,2021,8,1,Sunday,12,Middle Eastern
Kashmir Indische Spezialitaeten,2021-10-08,13:16,18.50,2021,10,8,Friday,13,Indian
Marmarita,2021-10-06,19:06,16.40,2021,10,6,Wednesday,19,Middle Eastern
Kashmir Indische Spezialitaeten,2021-10-02,17:37,19.50,2021,10,2,Saturday,17,Indian
Umami Friedrichshain,2021-10-02,12:03,13.40,2021,10,2,Saturday,12,Asian Fusion
Aroma 33,2021-10-01,19:06,15.90,2021,10,1,Friday,19,Vietnamese
Saigon Dragon,2021-09-29,18:09,18.00,2021,9,29,Wednesday,18,Vietnamese
JAPA,2021-09-28,18:51,13.20,2021,9,28,Tuesday,18,Japanese
Ryu Berlin,2021-09-25,18:06,16.90,2021,9,25,Saturday,18,Japanese
Marmarita,2021-09-25,12:21,16.40,2021,9,25,Saturday,12,Middle Eastern
JAPA,2021-09-23,18:17,13.20,2021,9,23,Thursday,18,Japanese
Pattaya II,2021-09-22,12:30,37.30,2021,9,22,Wednesday,12,Thai
Marmarita,2021-10-25,12:53,16.40,2021,10,25,Monday,12,Middle Eastern
Seth Restaurant,2021-10-24,17:55,11.70,2021,10,24,Sunday,17,Middle Eastern
JAPA,2021-10-23,18:21,26.40,2021,10,23,Saturday,18,Japanese
JAPA,2021-10-23,12:55,15.70,2021,10,23,Saturday,12,Japanese
JAPA,2021-10-18,18:46,12.90,2021,10,18,Monday,18,Japanese
Swadesh North and South Indian,2021-10-16,10:56,15.40,2021,10,16,Saturday,10,Indian
Pattaya II,2021-10-11,12:42,69.00,2021,10,11,Monday,12,Thai
Seth Restaurant,2021-10-09,13:06,19.30,2021,10,9,Saturday,13,Middle Eastern
Marmarita,2022-03-27,19:06,34.38,2022,3,27,Sunday,19,Middle Eastern
Marmarita,2022-03-13,14:35,16.40,2022,3,13,Sunday,14,Middle Eastern
Transit,2022-03-08,13:38,54.40,2022,3,8,Tuesday,13,Mixed
Swadesh North and South Indian,2022-02-26,18:52,33.60,2022,2,26,Saturday,18,Indian
Marmarita,2022-02-26,12:30,29.58,2022,2,26,Saturday,12,Middle Eastern
Asia Point,2022-01-23,12:25,24.10,2022,1,23,Sunday,12,Asian
Umami Friedrichshain,2021-12-19,12:06,41.00,2021,12,19,Sunday,12,Asian Fusion
JAPA,2021-11-06,18:06,17.20,2021,11,6,Saturday,18,Japanese
Swadesh North and South Indian,2021-11-06,12:05,32.00,2021,11,6,Saturday,12,Indian
Gao Fresh.Food.Fast,2021-11-03,18:49,12.80,2021,11,3,Wednesday,18,Asian
Asia Point,2021-10-31,12:33,16.40,2021,10,31,Sunday,12,Asian
Saigon Dragon,2023-01-07,12:59,43.00,2023,1,7,Saturday,12,Vietnamese
Saigon Dragon,2022-10-30,17:57,36.00,2022,10,30,Sunday,17,Vietnamese
Umami Friedrichshain,2022-10-29,13:31,42.00,2022,10,29,Saturday,13,Asian Fusion
Marmarita,2022-10-20,18:03,21.00,2022,10,20,Thursday,18,Middle Eastern
Marmarita,2022-09-03,13:13,37.00,2022,9,3,Saturday,13,Middle Eastern
Aleppo Supper Club,2022-06-03,11:13,81.80,2022,6,3,Friday,11,Middle Eastern
Marmarita,2022-05-19,19:58,19.70,2022,5,19,Thursday,19,Middle Eastern
Yogi Ashram,2022-05-02,18:51,35.70,2022,5,2,Monday,18,Indian
Mitho Cha,2022-04-15,17:53,17.70,2022,4,15,Friday,17,Nepalese
Fam. Tran,2022-04-14,12:07,21.00,2022,4,14,Thursday,12,Vietnamese
Amrit Kreuzberg,2022-04-10,16:49,32.00,2022,4,10,Sunday,16,Indian
Salami Social Club,2023-08-13,13:00,13.50,2023,8,13,Sunday,13,Italian
Marmarita,2023-08-06,13:42,20.00,2023,8,6,Sunday,13,Middle Eastern
Bring N Pizza Prenzlauer Berg,2023-07-22,14:49,12.50,2023,7,22,Saturday,14,Pizza
Marmarita,2023-06-18,12:03,19.50,2023,6,18,Sunday,12,Middle Eastern
Transit,2023-06-17,12:36,38.50,2023,6,17,Saturday,12,Mixed
Saigon Dragon,2023-06-02,19:24,33.59,2023,6,2,Friday,19,Vietnamese
Aroma 33,2023-05-28,13:47,28.00,2023,5,28,Sunday,13,Vietnamese
Saigon Dragon,2023-05-07,12:43,32.00,2023,5,7,Sunday,12,Vietnamese
Chay Village Friedrichshain,2023-04-23,11:47,34.00,2023,4,23,Sunday,11,Vietnamese
Stadtsalat,2023-02-10,12:32,40.54,2023,2,10,Friday,12,Healthy
Pattaya II,2023-01-12,14:01,19.00,2023,1,12,Thursday,14,Thai
Salami Social Club,2023-10-07,18:40,15.00,2023,10,7,Saturday,18,Italian
Pizza Koons,2023-10-01,18:43,18.84,2023,10,1,Sunday,18,Pizza
Marmarita,2023-09-28,19:51,20.00,2023,9,28,Thursday,19,Middle Eastern
Salami Social Club,2023-09-27,19:12,15.00,2023,9,27,Wednesday,19,Italian
Salami Social Club,2023-09-26,19:47,15.00,2023,9,26,Tuesday,19,Italian
Aroma 33,2023-09-24,20:00,20.00,2023,9,24,Sunday,20,Vietnamese
Saigon Dragon,2023-09-17,19:40,34.50,2023,9,17,Sunday,19,Vietnamese
Marmarita,2023-09-16,13:27,20.00,2023,9,16,Saturday,13,Middle Eastern
Marmarita,2023-09-03,12:16,18.99,2023,9,3,Sunday,12,Middle Eastern
Bring N Pizza Prenzlauer Berg,2023-08-27,12:53,17.50,2023,8,27,Sunday,12,Pizza
Bring N Pizza Prenzlauer Berg,2023-08-19,12:49,14.00,2023,8,19,Saturday,12,Pizza
Umami Friedrichshain,2023-11-05,12:29,28.00,2023,11,5,Sunday,12,Asian Fusion
Umami Friedrichshain,2023-11-04,19:10,33.79,2023,11,4,Saturday,19,Asian Fusion
Salami Social Club,2023-11-04,13:50,15.00,2023,11,4,Saturday,13,Italian
Salami Social Club,2023-10-29,13:38,15.00,2023,10,29,Sunday,13,Italian
Marmarita,2023-10-28,19:39,32.00,2023,10,28,Saturday,19,Middle Eastern
Basmah,2023-10-22,01:35,27.79,2023,10,22,Sunday,1,Middle Eastern
Salami Social Club,2023-10-21,20:08,39.79,2023,10,21,Saturday,20,Italian
Salami Social Club,2023-10-21,18:44,29.00,2023,10,21,Saturday,18,Italian
Salami Social Club,2023-10-21,12:31,14.29,2023,10,21,Saturday,12,Italian
Pattaya II,2023-10-17,12:54,13.09,2023,10,17,Tuesday,12,Thai
Salami Social Club,2023-10-11,12:13,15.00,2023,10,11,Wednesday,12,Italian
Salami Social Club,2024-01-17,18:55,0.58,2024,1,17,Wednesday,18,Italian
WEN CHENG,2024-01-06,19:08,30.00,2024,1,6,Saturday,19,Chinese
Maison Umami,2024-01-06,12:39,34.00,2024,1,6,Saturday,12,Asian Fusion
Salami Social Club,2024-01-01,14:05,14.00,2024,1,1,Monday,14,Italian
Salami Social Club,2023-12-22,13:12,15.00,2023,12,22,Friday,13,Italian
Saigon Dragon,2023-12-19,18:44,29.00,2023,12,19,Tuesday,18,Vietnamese
Salami Social Club,2023-12-01,18:48,15.00,2023,12,1,Friday,18,Italian
Umami Friedrichshain,2023-11-26,14:05,33.00,2023,11,26,Sunday,14,Asian Fusion
Salami Social Club,2023-11-24,18:36,42.00,2023,11,24,Friday,18,Italian
Umami Friedrichshain,2023-11-13,19:39,28.00,2023,11,13,Monday,19,Asian Fusion
Salami Social Club,2024-03-14,20:02,33.99,2024,3,14,Thursday,20,Italian
Haferkater Mitte,2024-03-12,09:25,27.00,2024,3,12,Tuesday,9,Breakfast
Salami Social Club,2024-03-04,12:05,31.74,2024,3,4,Monday,12,Italian
Salami Social Club,2024-03-02,12:14,45.00,2024,3,2,Saturday,12,Italian
Salami Social Club,2024-03-01,13:24,15.45,2024,3,1,Friday,13,Italian
Umami Friedrichshain,2024-02-25,15:25,20.39,2024,2,25,Sunday,15,Asian Fusion
Umami Friedrichshain,2024-02-12,18:45,27.75,2024,2,12,Monday,18,Asian Fusion
Salami Social Club,2024-02-10,12:06,27.23,2024,2,10,Saturday,12,Italian
Salami Social Club,2024-02-09,18:32,15.50,2024,2,9,Friday,18,Italian
Salami Social Club,2024-01-30,18:56,12.59,2024,1,30,Tuesday,18,Italian
WEN CHENG,2024-01-19,18:58,64.00,2024,1,19,Friday,18,Chinese
Salami Social Club,2024-04-07,12:45,45.00,2024,4,7,Sunday,12,Italian
Marmarita,2024-04-06,18:35,33.00,2024,4,6,Saturday,18,Middle Eastern
WEN CHENG,2024-04-03,19:41,39.25,2024,4,3,Wednesday,19,Chinese
Salami Social Club,2024-03-29,13:54,14.18,2024,3,29,Friday,13,Italian
Basmah,2024-03-28,13:30,10.82,2024,3,28,Thursday,13,Middle Eastern
Maison Umami,2024-03-25,20:07,40.00,2024,3,25,Monday,20,Asian Fusion
Zola Pizza,2024-03-24,12:46,80.60,2024,3,24,Sunday,12,Pizza
Salami Social Club,2024-03-23,18:02,33.00,2024,3,23,Saturday,18,Italian
WEN CHENG,2024-03-16,19:57,22.56,2024,3,16,Saturday,19,Chinese
Salami Social Club,2024-03-15,13:23,33.00,2024,3,15,Friday,13,Italian
WEN CHENG,2024-08-30,18:31,33.00,2024,8,30,Friday,18,Chinese
WEN CHENG,2024-06-19,18:04,15.70,2024,6,19,Wednesday,18,Chinese
Kyoto Restaurant,2024-06-13,18:30,26.00,2024,6,13,Thursday,18,Japanese
WEN CHENG,2024-05-24,19:18,34.50,2024,5,24,Friday,19,Chinese
PHO Noodlebar Kreuzberg,2024-05-20,19:04,25.80,2024,5,20,Monday,19,Vietnamese
Salami Social Club,2024-05-04,12:45,30.00,2024,5,4,Saturday,12,Italian
PHO Noodlebar Kreuzberg,2024-05-03,19:02,33.50,2024,5,3,Friday,19,Vietnamese
Salami Social Club,2024-04-28,12:09,45.00,2024,4,28,Sunday,12,Italian
WEN CHENG,2024-04-27,13:28,32.00,2024,4,27,Saturday,13,Chinese
Zola Pizza,2024-04-18,17:41,54.00,2024,4,18,Thursday,17,Pizza
Salami Social Club,2024-04-18,13:02,78.74,2024,4,18,Thursday,13,Italian
Umami Friedrichshain,2024-11-30,19:29,28.50,2024,11,30,Saturday,19,Asian Fusion
WEN CHENG,2024-11-22,19:27,35.19,2024,11,22,Friday,19,Chinese
Marmarita,2024-11-14,16:40,12.99,2024,11,14,Thursday,16,Middle Eastern
Salami Social Club,2024-10-30,18:09,30.00,2024,10,30,Wednesday,18,Italian
Marmarita,2024-09-22,11:49,52.54,2024,9,22,Sunday,11,Middle Eastern
Salami Social Club,2024-09-21,18:51,14.43,2024,9,21,Saturday,18,Italian
Kyoto Restaurant,2024-09-20,17:57,8.78,2024,9,20,Friday,17,Japanese
Zola Pizza,2024-09-08,19:29,53.35,2024,9,8,Sunday,19,Pizza
Kyoto Restaurant,2024-09-03,18:26,21.35,2024,9,3,Tuesday,18,Japanese
WEN CHENG,2025-01-28,20:25,38.00,2025,1,28,Tuesday,20,Chinese
Marmarita,2025-01-26,12:40,42.00,2025,1,26,Sunday,12,Middle Eastern
PHO Noodlebar Kreuzberg,2025-01-25,17:29,37.00,2025,1,25,Saturday,17,Vietnamese
PHO Noodlebar Kreuzberg,2025-01-14,18:10,34.00,2025,1,14,Tuesday,18,Vietnamese
Marmarita,2025-01-13,20:27,30.01,2025,1,13,Monday,20,Middle Eastern
Umami Friedrichshain,2025-01-11,14:32,33.00,2025,1,11,Saturday,14,Asian Fusion
Marmarita,2024-12-23,10:55,39.69,2024,12,23,Monday,10,Middle Eastern
Salami Social Club,2024-12-22,18:14,30.00,2024,12,22,Sunday,18,Italian
Umami Friedrichshain,2024-12-13,12:43,28.50,2024,12,13,Friday,12,Asian Fusion
Buya Ramen Factory,2025-05-13,18:35,9.49,2025,5,13,Tuesday,18,Japanese
Tokyo Gohan,2025-04-30,18:16,26.50,2025,4,30,Wednesday,18,Japanese
Umami Friedrichshain,2025-04-29,18:37,49.00,2025,4,29,Tuesday,18,Asian Fusion
Salami Social Club,2025-04-19,18:29,27.00,2025,4,19,Saturday,18,Italian
WEN CHENG,2025-04-17,18:47,35.00,2025,4,17,Thursday,18,Chinese
Salami Social Club,2025-04-11,18:32,27.00,2025,4,11,Friday,18,Italian
Maison Umami,2025-04-09,19:42,29.00,2025,4,9,Wednesday,19,Asian Fusion
Salami Social Club,2025-03-29,12:42,27.00,2025,3,29,Saturday,12,Italian
Tokyo Gohan,2025-03-28,15:13,32.00,2025,3,28,Friday,15,Japanese
Shodo Udon Lab,2025-06-22,19:25,40.00,2025,6,22,Sunday,19,Japanese
Tokyo Gohan,2025-06-20,17:37,32.00,2025,6,20,Friday,17,Japanese
Chutnify Neukoelln,2025-06-19,12:40,55.00,2025,6,19,Thursday,12,Indian
Umami Friedrichshain,2025-06-07,12:51,36.00,2025,6,7,Saturday,12,Asian Fusion
WEN CHENG,2025-06-06,20:00,36.00,2025,6,6,Friday,20,Chinese
Perbacco Ristorante Pizza,2025-05-31,18:44,26.00,2025,5,31,Saturday,18,Italian
Umami Friedrichshain,2025-05-30,17:19,24.00,2025,5,30,Friday,17,Asian Fusion
Salami Social Club,2025-05-27,18:15,29.25,2025,5,27,Tuesday,18,Italian
Partenope 081,2025-05-22,18:12,33.00,2025,5,22,Thursday,18,Italian
Maison Umami,2025-05-17,12:52,20.00,2025,5,17,Saturday,12,Asian Fusion
Salami Social Club,2025-05-15,17:57,29.70,2025,5,15,Thursday,17,Italian
Thu Vietnam Restaurant,2025-08-30,18:28,42.00,2025,8,30,Saturday,18,Vietnamese
Zola Pizza,2025-08-26,18:26,31.00,2025,8,26,Tuesday,18,Pizza
Shodo Udon Lab,2025-08-18,18:39,34.00,2025,8,18,Monday,18,Japanese
Shodo Udon Lab,2025-08-17,12:15,34.00,2025,8,17,Sunday,12,Japanese
Partenope 081,2025-07-25,19:08,34.00,2025,7,25,Friday,19,Italian
Shodo Udon Lab,2025-07-21,18:34,85.00,2025,7,21,Monday,18,Japanese
Salami Social Club,2025-07-18,17:57,29.70,2025,7,18,Friday,17,Italian
WEN CHENG,2025-07-17,18:57,20.00,2025,7,17,Thursday,18,Chinese
Salami Social Club,2025-07-09,18:29,14.85,2025,7,9,Wednesday,18,Italian
Shodo Udon Lab,2025-07-06,13:32,34.00,2025,7,6,Sunday,13,Japanese
Partenope 081,2025-06-27,20:12,17.00,2025,6,27,Friday,20,Italian
PHO Noodlebar Kreuzberg,2025-10-30,17:25,33.00,2025,10,30,Thursday,17,Vietnamese
Partenope 081,2025-10-29,17:36,31.00,2025,10,29,Wednesday,17,Italian
PHO Noodlebar Kreuzberg,2025-10-21,18:38,34.00,2025,10,21,Tuesday,18,Vietnamese
Salami Social Club,2025-10-20,18:15,14.85,2025,10,20,Monday,18,Italian
PHO Noodlebar Kreuzberg,2025-10-16,17:43,18.00,2025,10,16,Thursday,17,Vietnamese
Umami Friedrichshain,2025-10-03,18:47,16.00,2025,10,3,Friday,18,Asian Fusion
WEN CHENG,2025-09-20,17:50,25.07,2025,9,20,Saturday,17,Chinese
Umami Friedrichshain,2025-09-19,17:57,16.66,2025,9,19,Friday,17,Asian Fusion
Osteria Fiorello,2025-09-06,12:37,90.00,2025,9,6,Saturday,12,Italian
Shodo Udon Lab,2025-09-04,18:37,34.00,2025,9,4,Thursday,18,Japanese
WEN CHENG,2025-12-18,18:26,26.00,2025,12,18,Thursday,18,Chinese
Shodo Udon Lab,2025-12-05,12:29,32.00,2025,12,5,Friday,12,Japanese
Zola Pizza,2025-11-30,12:53,33.00,2025,11,30,Sunday,12,Pizza
PHO Noodlebar Kreuzberg,2025-11-29,13:15,75.00,2025,11,29,Saturday,13,Vietnamese
WEN CHENG,2025-11-14,18:28,25.07,2025,11,14,Friday,18,Chinese
Partenope 081,2025-11-12,18:22,19.00,2025,11,12,Wednesday,18,Italian
Chutnify Neukoelln,2025-11-02,12:55,45.00,2025,11,2,Sunday,12,Indian
Umami Friedrichshain,2026-01-31,18:03,20.00,2026,1,31,Saturday,18,Asian Fusion
Partenope 081,2026-01-29,19:02,22.00,2026,1,29,Thursday,19,Italian
Umami Friedrichshain,2026-01-24,13:17,46.09,2026,1,24,Saturday,13,Asian Fusion
Comebuy Frankfurter Allee,2026-01-16,16:40,19.97,2026,1,16,Friday,16,Bubble Tea
Ethiopian Restaurant Langano,2026-01-16,16:33,41.28,2026,1,16,Friday,16,Ethiopian
Partenope 081,2026-01-11,18:07,23.00,2026,1,11,Sunday,18,Italian
Partenope 081,2026-01-04,18:01,23.00,2026,1,4,Sunday,18,Italian`;

const parseCSVLine = (line) => {
  const values = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      values.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  values.push(current);
  return values;
};

const WOLT_REQUIRED_HEADERS = ['Restaurant', 'Date', 'Time', 'Amount', 'Year', 'Month', 'Day', 'DayOfWeek', 'Hour', 'Cuisine'];
const WOLT_MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
const WOLT_MAX_ROWS = 20000;

const isValidDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(String(value || '').trim());
const isValidTime = (value) => /^([01]\d|2[0-3]):[0-5]\d$/.test(String(value || '').trim());

const validateWoltCSV = (csv) => {
  const lines = String(csv || '').trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) {
    return { ok: false, error: 'CSV is empty or missing data rows.' };
  }

  const headers = parseCSVLine(lines[0]).map((h) => String(h || '').trim());
  const missing = WOLT_REQUIRED_HEADERS.filter((h) => !headers.includes(h));
  if (missing.length) {
    return { ok: false, error: `Missing required columns: ${missing.join(', ')}` };
  }

  const rowCount = lines.length - 1;
  if (rowCount > WOLT_MAX_ROWS) {
    return { ok: false, error: `File has ${rowCount} rows. Maximum supported is ${WOLT_MAX_ROWS}.` };
  }

  for (let rowIndex = 1; rowIndex < lines.length; rowIndex += 1) {
    const values = parseCSVLine(lines[rowIndex]);
    const row = {};
    headers.forEach((h, i) => { row[h] = String(values[i] ?? '').trim(); });

    const amount = parseFloat(row.Amount);
    const year = parseInt(row.Year, 10);
    const month = parseInt(row.Month, 10);
    const day = parseInt(row.Day, 10);
    const hour = parseInt(row.Hour, 10);

    if (!row.Restaurant) return { ok: false, error: `Row ${rowIndex + 1}: Restaurant is empty.` };
    if (!isValidDate(row.Date)) return { ok: false, error: `Row ${rowIndex + 1}: Date must be YYYY-MM-DD.` };
    if (!isValidTime(row.Time)) return { ok: false, error: `Row ${rowIndex + 1}: Time must be HH:MM (24h).` };
    if (Number.isNaN(amount)) return { ok: false, error: `Row ${rowIndex + 1}: Amount must be a number.` };
    if (Number.isNaN(year)) return { ok: false, error: `Row ${rowIndex + 1}: Year must be numeric.` };
    if (Number.isNaN(month) || month < 1 || month > 12) return { ok: false, error: `Row ${rowIndex + 1}: Month must be 1-12.` };
    if (Number.isNaN(day) || day < 1 || day > 31) return { ok: false, error: `Row ${rowIndex + 1}: Day must be 1-31.` };
    if (Number.isNaN(hour) || hour < 0 || hour > 23) return { ok: false, error: `Row ${rowIndex + 1}: Hour must be 0-23.` };
    if (!row.Cuisine) return { ok: false, error: `Row ${rowIndex + 1}: Cuisine is empty.` };
  }

  return { ok: true };
};

const toDateTime = (row) => {
  if (!row?.Date) return Number.NaN;
  const iso = `${row.Date}T${row.Time || '00:00'}:00`;
  return new Date(iso).getTime();
};

const parseCSV = (csv) => {
  const lines = csv.trim().split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];
  const headers = parseCSVLine(lines[0]).map((h) => String(h || '').trim());
  const parsed = lines.slice(1).map(line => {
    const values = parseCSVLine(line);
    const obj = {};
    headers.forEach((h, i) => { obj[h] = String(values[i] ?? '').trim(); });
    obj.Amount = parseFloat(obj.Amount) || 0;
    obj.Year = parseInt(obj.Year, 10) || 0;
    obj.Month = parseInt(obj.Month, 10) || 0;
    obj.Day = parseInt(obj.Day, 10) || 0;
    obj.Hour = parseInt(obj.Hour, 10) || 0;
    return obj;
  });
  return parsed.sort((a, b) => toDateTime(a) - toDateTime(b));
};

// MECE Cuisine Mapping
const mapToMECECuisine = (originalCuisine) => {
  const mapping = {
    'Japanese': 'Japanese',
    'Chinese': 'Chinese',
    'Korean': 'Korean',
    'Vietnamese': 'Vietnamese',
    'Thai': 'Thai',
    'Hawaiian': 'Southeast Asian',
    'Indian': 'Indian',
    'Nepalese': 'Indian',
    'Middle Eastern': 'Middle Eastern',
    'Italian': 'Italian',
    'Pizza': 'Italian',
    'Ethiopian': 'African',
    'Asian Fusion': 'Asian Fusion',
    'Asian': 'Asian Fusion',
    'Mixed': 'Fusion & Other',
    'Healthy': 'Fusion & Other',
    'Breakfast': 'Fusion & Other',
    'Bubble Tea': 'Fusion & Other',
  };
  return mapping[originalCuisine] || 'Fusion & Other';
};

// Official Wolt Brand Colors
const WOLT_BLUE = '#009DE0';
const WOLT_BLUE_DARK = '#007BB5';
const WOLT_BLUE_LIGHT = '#E6F6FC';
const WOLT_TEXT = '#202125';
const WOLT_TEXT_SECONDARY = '#5E6167';
const WOLT_BORDER = '#E8E9EB';
const WOLT_BG = '#FFFFFF';
const WOLT_BG_SUBTLE = '#F8F9FA';
const WOLT_SUCCESS = '#22c55e';
const WOLT_WARNING = '#f59e0b';
const WOLT_DANGER = '#ef4444';

const CHART_COLORS = [
  '#009DE0', '#00C4B4', '#0077B6', '#48CAE4', '#00B4D8',
  '#5BCEFA', '#0096C7', '#023E8A', '#90E0EF', '#33B5E8',
  '#007BB5', '#ADE8F4'
];

// Delivery fee estimate (average Wolt fee)
const ESTIMATED_DELIVERY_FEE = 2.49;
const WOLT_PLUS_MONTHLY = 9.99;

export default function WoltDashboard() {
  const [uploadedCSV, setUploadedCSV] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [uploadSummary, setUploadSummary] = useState(null);
  const [excludeOutliers, setExcludeOutliers] = useState(false);
  const [showDataTables, setShowDataTables] = useState(false);

  const data = useMemo(() => parseCSV(uploadedCSV || rawData), [uploadedCSV]);

  const outlierThreshold = useMemo(() => {
    if (data.length < 4) return Number.POSITIVE_INFINITY;
    const values = data.map((d) => d.Amount).sort((a, b) => a - b);
    const q1 = values[Math.floor(values.length * 0.25)] ?? values[0];
    const q3 = values[Math.floor(values.length * 0.75)] ?? values[values.length - 1];
    const iqr = q3 - q1;
    return q3 + (1.5 * iqr);
  }, [data]);

  const analysisData = useMemo(() => (
    excludeOutliers ? data.filter((d) => d.Amount <= outlierThreshold) : data
  ), [data, excludeOutliers, outlierThreshold]);
  const removedOutlierCount = Math.max(0, data.length - analysisData.length);

  // Filter states
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedCuisine, setSelectedCuisine] = useState('all');
  const [selectedRestaurant, setSelectedRestaurant] = useState('all');

  // Budget state
  const [monthlyBudget, setMonthlyBudget] = useState(150);

  // Collapsible states
  const [showNerdMode, setShowNerdMode] = useState(false);
  const [showChurnAnalysis, setShowChurnAnalysis] = useState(true);

  const handleCSVUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > WOLT_MAX_FILE_SIZE_BYTES) {
      setUploadError(`File is too large. Maximum size is ${Math.round(WOLT_MAX_FILE_SIZE_BYTES / (1024 * 1024))} MB.`);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = String(e.target?.result || '');
      const validation = validateWoltCSV(content);
      if (!validation.ok) {
        setUploadError(validation.error);
        return;
      }
      const parsed = parseCSV(content);
      if (parsed.length === 0) {
        setUploadError('Could not parse any rows. Please upload a valid Wolt CSV export.');
        return;
      }
      const headers = parseCSVLine(content.trim().split(/\r?\n/)[0]).map((h) => String(h || '').trim());
      const dates = parsed.map((row) => row.Date).filter(isValidDate).sort();
      setUploadedCSV(content);
      setUploadedFileName(file.name);
      setUploadSummary({
        rows: parsed.length,
        columns: headers,
        dateStart: dates[0] || 'n/a',
        dateEnd: dates[dates.length - 1] || 'n/a'
      });
      setExcludeOutliers(false);
      setUploadError('');
    };
    reader.onerror = () => setUploadError('Failed to read file.');
    reader.readAsText(file);
  };

  // Get unique values for filters
  const allCuisines = useMemo(() => [...new Set(analysisData.map(d => mapToMECECuisine(d.Cuisine)))].sort(), [analysisData]);
  const allRestaurants = useMemo(() => [...new Set(analysisData.map(d => d.Restaurant))].sort(), [analysisData]);
  const years = useMemo(() => [...new Set(analysisData.map(d => d.Year))].sort(), [analysisData]);

  // Apply all filters
  const filteredData = useMemo(() => {
    let filtered = analysisData;
    if (selectedYear !== 'all') {
      filtered = filtered.filter(d => d.Year === parseInt(selectedYear));
    }
    if (selectedCuisine !== 'all') {
      filtered = filtered.filter(d => mapToMECECuisine(d.Cuisine) === selectedCuisine);
    }
    if (selectedRestaurant !== 'all') {
      filtered = filtered.filter(d => d.Restaurant === selectedRestaurant);
    }
    return filtered;
  }, [analysisData, selectedYear, selectedCuisine, selectedRestaurant]);

  // Stats calculations
  const stats = useMemo(() => {
    const totalSpent = filteredData.reduce((sum, d) => sum + d.Amount, 0);
    const totalOrders = filteredData.length;
    const avgOrder = totalOrders > 0 ? totalSpent / totalOrders : 0;
    const maxOrder = filteredData.length > 0 ? Math.max(...filteredData.map(d => d.Amount)) : 0;
    const maxOrderItem = filteredData.find(d => d.Amount === maxOrder);

    const restaurantCounts = {};
    filteredData.forEach(d => {
      restaurantCounts[d.Restaurant] = (restaurantCounts[d.Restaurant] || 0) + 1;
    });

    const topRestaurant = Object.entries(restaurantCounts).sort((a, b) => b[1] - a[1])[0];
    const uniqueRestaurants = Object.keys(restaurantCounts).length;

    // Delivery fee estimates
    const estimatedDeliveryFees = totalOrders * ESTIMATED_DELIVERY_FEE;
    const firstTimestamp = filteredData.length > 0 ? toDateTime(filteredData[0]) : Number.NaN;
    const lastTimestamp = filteredData.length > 0 ? toDateTime(filteredData[filteredData.length - 1]) : Number.NaN;
    const monthSpan = Number.isFinite(firstTimestamp) && Number.isFinite(lastTimestamp)
      ? Math.ceil((lastTimestamp - firstTimestamp) / (1000 * 60 * 60 * 24 * 30))
      : 0;
    const woltPlusMonths = Math.max(1, monthSpan);
    const woltPlusCost = woltPlusMonths * WOLT_PLUS_MONTHLY;
    const potentialSavings = estimatedDeliveryFees - woltPlusCost;

    return { totalSpent, totalOrders, avgOrder, maxOrder, maxOrderItem, topRestaurant, uniqueRestaurants, estimatedDeliveryFees, woltPlusCost, potentialSavings, woltPlusMonths };
  }, [filteredData]);

  // Monthly data for charts
  const monthlyData = useMemo(() => {
    const monthly = {};
    filteredData.forEach(d => {
      const key = `${d.Year}-${String(d.Month).padStart(2, '0')}`;
      if (!monthly[key]) monthly[key] = { month: key, amount: 0, orders: 0 };
      monthly[key].amount += d.Amount;
      monthly[key].orders += 1;
    });
    return Object.values(monthly).sort((a, b) => a.month.localeCompare(b.month));
  }, [filteredData]);

  // Month-over-month comparison
  const monthComparison = useMemo(() => {
    if (monthlyData.length < 2) return null;
    const current = monthlyData[monthlyData.length - 1];
    const previous = monthlyData[monthlyData.length - 2];
    const change = previous.amount > 0
      ? ((current.amount - previous.amount) / previous.amount) * 100
      : 0;
    return { current, previous, change };
  }, [monthlyData]);

  const monthlyBenchmarks = useMemo(() => {
    if (!monthlyData.length) return null;
    const current = monthlyData[monthlyData.length - 1];
    const previous = monthlyData.length > 1 ? monthlyData[monthlyData.length - 2] : null;
    const rollingWindow = monthlyData.slice(-3);
    const rollingAvg = rollingWindow.reduce((sum, m) => sum + m.amount, 0) / rollingWindow.length;
    const personalBest = monthlyData.reduce((best, month) => (month.amount < best.amount ? month : best), monthlyData[0]);
    return {
      current,
      previous,
      rollingAvg,
      personalBest,
      vsPrevious: previous ? ((current.amount - previous.amount) / Math.max(previous.amount, 1)) * 100 : null,
      vsRollingAvg: ((current.amount - rollingAvg) / Math.max(rollingAvg, 1)) * 100,
      vsBest: ((current.amount - personalBest.amount) / Math.max(personalBest.amount, 1)) * 100,
    };
  }, [monthlyData]);

  const automatedInsights = useMemo(() => {
    const insights = [];
    const avgMonthlySpend = monthlyData.length
      ? monthlyData.reduce((sum, m) => sum + m.amount, 0) / monthlyData.length
      : 0;
    const topCuisine = cuisineData[0];
    const topRestaurantName = stats.topRestaurant?.[0] || 'n/a';
    const topRestaurantOrders = stats.topRestaurant?.[1] || 0;

    insights.push(`Analyzed ${filteredData.length} orders${uploadedFileName ? ` from ${uploadedFileName}` : ''}.`);
    insights.push(`Average spend per order is €${stats.avgOrder.toFixed(2)} and average monthly spend is €${avgMonthlySpend.toFixed(2)}.`);

    if (topCuisine) {
      const share = stats.totalOrders > 0 ? (topCuisine.orders / stats.totalOrders) * 100 : 0;
      insights.push(`Top cuisine is ${topCuisine.name} with ${topCuisine.orders} orders (${share.toFixed(1)}% of orders).`);
    }

    if (topRestaurantName !== 'n/a') {
      insights.push(`Most used restaurant is ${topRestaurantName} with ${topRestaurantOrders} orders.`);
    }

    if (monthlyBenchmarks?.vsRollingAvg !== undefined) {
      insights.push(
        `Current month is ${monthlyBenchmarks.vsRollingAvg > 0 ? '+' : ''}${monthlyBenchmarks.vsRollingAvg.toFixed(1)}% vs your 3-month average.`
      );
    }

    if (currentMonthBudget.projectedSpend > 0) {
      const delta = currentMonthBudget.projectedSpend - monthlyBudget;
      insights.push(
        delta > 0
          ? `Projected month-end is €${currentMonthBudget.projectedSpend.toFixed(2)}, about €${delta.toFixed(2)} above budget.`
          : `Projected month-end is €${currentMonthBudget.projectedSpend.toFixed(2)}, about €${Math.abs(delta).toFixed(2)} below budget.`
      );
    }

    return insights.slice(0, 5);
  }, [monthlyData, cuisineData, stats, filteredData.length, uploadedFileName, monthlyBenchmarks, currentMonthBudget, monthlyBudget]);

  const anomalyAlerts = useMemo(() => {
    const alerts = [];

    if (monthlyBenchmarks && Math.abs(monthlyBenchmarks.vsRollingAvg) >= 20) {
      alerts.push({
        title: 'Monthly spend shift',
        detail: `Current month is ${monthlyBenchmarks.vsRollingAvg > 0 ? '+' : ''}${monthlyBenchmarks.vsRollingAvg.toFixed(1)}% vs 3-month average.`,
        severity: monthlyBenchmarks.vsRollingAvg > 0 ? 'high' : 'medium'
      });
    }

    if (stats.avgOrder > 0 && stats.maxOrder >= stats.avgOrder * 2.5) {
      alerts.push({
        title: 'High single-order spike',
        detail: `Largest order (€${stats.maxOrder.toFixed(2)}) is ${(stats.maxOrder / stats.avgOrder).toFixed(1)}x your average order.`,
        severity: 'medium'
      });
    }

    const lateNightOrders = hourData
      .filter((h) => h.hour >= 22 || h.hour <= 5)
      .reduce((sum, h) => sum + h.orders, 0);
    const lateNightPct = stats.totalOrders > 0 ? (lateNightOrders / stats.totalOrders) * 100 : 0;
    if (stats.totalOrders >= 20 && lateNightPct >= 30) {
      alerts.push({
        title: 'Late-night concentration',
        detail: `${lateNightPct.toFixed(1)}% of orders happen between 22:00 and 05:59.`,
        severity: 'low'
      });
    }

    return alerts;
  }, [monthlyBenchmarks, stats, hourData]);

  // Current month budget tracking
  const currentMonthBudget = useMemo(() => {
    const now = new Date();
    const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const currentMonthData = monthlyData.find(m => m.month === currentMonthKey);
    const spent = currentMonthData?.amount || 0;
    const percentage = monthlyBudget > 0 ? (spent / monthlyBudget) * 100 : 0;
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const dayOfMonth = now.getDate();
    const projectedSpend = dayOfMonth > 0 ? (spent / dayOfMonth) * daysInMonth : 0;
    return { spent, percentage, projectedSpend, daysRemaining: daysInMonth - dayOfMonth };
  }, [monthlyData, monthlyBudget]);

  // Day of week data
  const dayOfWeekData = useMemo(() => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const dayStats = {};
    days.forEach(d => dayStats[d] = { day: d, orders: 0, amount: 0 });
    filteredData.forEach(d => {
      dayStats[d.DayOfWeek].orders += 1;
      dayStats[d.DayOfWeek].amount += d.Amount;
    });
    return days.map(d => dayStats[d]);
  }, [filteredData]);

  // Hour data
  const hourData = useMemo(() => {
    const hours = {};
    for (let i = 0; i < 24; i++) hours[i] = { hour: i, orders: 0 };
    filteredData.forEach(d => hours[d.Hour].orders += 1);
    return Object.values(hours);
  }, [filteredData]);

  // Cuisine data with legend-friendly format
  const cuisineData = useMemo(() => {
    const cuisines = {};
    filteredData.forEach(d => {
      const meceCuisine = mapToMECECuisine(d.Cuisine);
      if (!cuisines[meceCuisine]) cuisines[meceCuisine] = { total: 0, orders: 0 };
      cuisines[meceCuisine].total += d.Amount;
      cuisines[meceCuisine].orders += 1;
    });
    return Object.entries(cuisines)
      .map(([name, data]) => ({ name, value: Math.round(data.total * 100) / 100, orders: data.orders }))
      .sort((a, b) => b.value - a.value);
  }, [filteredData]);

  // Top restaurants
  const topRestaurants = useMemo(() => {
    const counts = {};
    filteredData.forEach(d => {
      counts[d.Restaurant] = (counts[d.Restaurant] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([name, orders]) => ({ name: name.length > 20 ? name.slice(0, 20) + '...' : name, fullName: name, orders }))
      .sort((a, b) => b.orders - a.orders)
      .slice(0, 10);
  }, [filteredData]);

  // Restaurant churn analysis (abandoned restaurants)
  const churnAnalysis = useMemo(() => {
    const restaurantData = {};
    analysisData.forEach(d => {
      if (!restaurantData[d.Restaurant]) {
        restaurantData[d.Restaurant] = { orders: [], lastOrder: null, totalOrders: 0 };
      }
      restaurantData[d.Restaurant].orders.push(d.Date);
      restaurantData[d.Restaurant].totalOrders += 1;
      if (!restaurantData[d.Restaurant].lastOrder || d.Date > restaurantData[d.Restaurant].lastOrder) {
        restaurantData[d.Restaurant].lastOrder = d.Date;
      }
    });

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const sixMonthsAgoStr = sixMonthsAgo.toISOString().split('T')[0];

    const abandoned = Object.entries(restaurantData)
      .filter(([name, data]) => data.totalOrders >= 3 && data.lastOrder < sixMonthsAgoStr)
      .map(([name, data]) => ({
        name,
        totalOrders: data.totalOrders,
        lastOrder: data.lastOrder,
        daysSince: Math.floor((new Date() - new Date(data.lastOrder)) / (1000*60*60*24))
      }))
      .sort((a, b) => b.totalOrders - a.totalOrders)
      .slice(0, 5);

    const oneHitWonders = Object.entries(restaurantData)
      .filter(([name, data]) => data.totalOrders === 1)
      .length;

    return { abandoned, oneHitWonders };
  }, [analysisData]);

  // Top 3 restaurants trend
  const top3RestaurantsTrend = useMemo(() => {
    const counts = {};
    analysisData.forEach(d => {
      counts[d.Restaurant] = (counts[d.Restaurant] || 0) + 1;
    });
    const top3Names = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name]) => name);

    const quarterlyData = {};
    analysisData.forEach(d => {
      const quarter = `${d.Year} Q${Math.ceil(d.Month / 3)}`;
      if (!quarterlyData[quarter]) {
        quarterlyData[quarter] = { quarter, sortKey: `${d.Year}-${Math.ceil(d.Month / 3)}` };
        top3Names.forEach(name => {
          quarterlyData[quarter][name] = 0;
        });
      }
      if (top3Names.includes(d.Restaurant)) {
        quarterlyData[quarter][d.Restaurant] += 1;
      }
    });

    return {
      data: Object.values(quarterlyData).sort((a, b) => a.sortKey.localeCompare(b.sortKey)),
      restaurants: top3Names
    };
  }, [analysisData]);

  // Yearly comparison
  const yearlyComparison = useMemo(() => {
    const yearly = {};
    analysisData.forEach(d => {
      if (!yearly[d.Year]) yearly[d.Year] = { year: d.Year, amount: 0, orders: 0 };
      yearly[d.Year].amount += d.Amount;
      yearly[d.Year].orders += 1;
    });
    return Object.values(yearly).sort((a, b) => a.year - b.year);
  }, [analysisData]);

  const formatCurrency = (val) => `€${val.toFixed(2)}`;
  const formatMonth = (val) => {
    const [y, m] = val.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(m) - 1]} '${y.slice(2)}`;
  };

  const clearFilters = () => {
    setSelectedYear('all');
    setSelectedCuisine('all');
    setSelectedRestaurant('all');
  };

  const hasActiveFilters = selectedYear !== 'all' || selectedCuisine !== 'all' || selectedRestaurant !== 'all';
  const filteredDaysSpan = useMemo(() => {
    if (filteredData.length < 2) return 1;
    const first = toDateTime(filteredData[0]);
    const last = toDateTime(filteredData[filteredData.length - 1]);
    if (!Number.isFinite(first) || !Number.isFinite(last)) return 1;
    return Math.max(1, Math.ceil((last - first) / (1000 * 60 * 60 * 24)));
  }, [filteredData]);

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ backgroundColor: WOLT_BG, color: WOLT_TEXT }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="24" fill={WOLT_BLUE}/>
              <path d="M14 20L24 30L34 20" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="24" cy="16" r="4" fill="white"/>
            </svg>
            <h1 className="text-4xl md:text-6xl font-black" style={{color: WOLT_BLUE}}>
              wolt analytics
            </h1>
          </div>
          <p style={{color: WOLT_TEXT_SECONDARY}} className="text-lg">Your Personal Delivery Data Dashboard</p>
        </header>

        {/* NEW: Budget Tracker */}
        <div className="mb-6 p-5 rounded-2xl" style={{ backgroundColor: WOLT_BLUE_LIGHT, border: `2px solid ${WOLT_BLUE}` }}>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💰</span>
              <h3 className="text-lg font-bold" style={{color: WOLT_BLUE}}>Monthly Budget Tracker</h3>
            </div>
            <div className="flex items-center gap-2">
              <label htmlFor="wolt-monthly-budget" className="text-sm font-medium" style={{color: WOLT_TEXT_SECONDARY}}>Budget:</label>
              <input
                id="wolt-monthly-budget"
                type="number"
                value={monthlyBudget}
                onChange={(e) => setMonthlyBudget(Math.max(1, parseInt(e.target.value) || 0))}
                className="w-20 px-2 py-1 rounded-lg border text-center font-bold"
                style={{ borderColor: WOLT_BORDER, color: WOLT_TEXT }}
              />
              <span style={{color: WOLT_TEXT_SECONDARY}}>€</span>
            </div>
          </div>

          <div className="relative h-8 rounded-full overflow-hidden mb-2" style={{ backgroundColor: WOLT_BORDER }}>
            <div
              className="absolute h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(currentMonthBudget.percentage, 100)}%`,
                backgroundColor: currentMonthBudget.percentage > 100 ? WOLT_DANGER : currentMonthBudget.percentage > 80 ? WOLT_WARNING : WOLT_SUCCESS
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-sm font-bold" style={{color: WOLT_TEXT}}>
              €{currentMonthBudget.spent.toFixed(2)} / €{monthlyBudget} ({currentMonthBudget.percentage.toFixed(0)}%)
            </div>
          </div>

          <div className="flex flex-wrap justify-between text-sm" style={{color: WOLT_TEXT_SECONDARY}}>
            <span>📅 {currentMonthBudget.daysRemaining} days left this month</span>
            <span>📈 Projected: €{currentMonthBudget.projectedSpend.toFixed(2)}</span>
            {currentMonthBudget.projectedSpend > monthlyBudget && (
              <span style={{color: WOLT_DANGER}}>⚠️ On track to exceed budget by €{(currentMonthBudget.projectedSpend - monthlyBudget).toFixed(2)}</span>
            )}
          </div>
        </div>

        {/* NEW: Advanced Filters */}
        <div className="mb-6 p-4 rounded-2xl" style={{ backgroundColor: WOLT_BG_SUBTLE, border: `1px solid ${WOLT_BORDER}` }}>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <label htmlFor="wolt-csv-upload" className="px-3 py-2 rounded-lg border text-sm font-medium cursor-pointer" style={{ borderColor: WOLT_BORDER, backgroundColor: WOLT_BG }}>
              Upload Wolt CSV
            </label>
            <input
              id="wolt-csv-upload"
              type="file"
              accept=".csv,text/csv"
              className="sr-only"
              onChange={handleCSVUpload}
              aria-describedby="wolt-upload-help wolt-upload-error"
            />
            <span id="wolt-upload-help" className="text-sm" style={{color: WOLT_TEXT_SECONDARY}}>
              Data stays in your browser. Max 5MB, max 20,000 rows.
            </span>
            {uploadedFileName && <span className="text-sm" style={{color: WOLT_TEXT_SECONDARY}}>Using: {uploadedFileName}</span>}
            {uploadedCSV && (
              <button
                onClick={() => {
                  setUploadedCSV('');
                  setUploadedFileName('');
                  setUploadError('');
                  setUploadSummary(null);
                  setExcludeOutliers(false);
                }}
                className="px-3 py-2 rounded-lg text-sm"
                style={{ backgroundColor: WOLT_BG, border: `1px solid ${WOLT_BORDER}`, color: WOLT_TEXT_SECONDARY }}
              >
                Use Built-in Sample
              </button>
            )}
            {uploadError && <span id="wolt-upload-error" role="alert" className="text-sm" style={{color: WOLT_DANGER}}>{uploadError}</span>}
          </div>

          {uploadSummary && (
            <div className="mb-4 p-3 rounded-xl" style={{ backgroundColor: WOLT_BG, border: `1px solid ${WOLT_BORDER}` }}>
              <div className="text-sm font-semibold mb-2" style={{ color: WOLT_TEXT }}>Last upload summary</div>
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm" style={{ color: WOLT_TEXT_SECONDARY }}>
                <span>Rows: {uploadSummary.rows}</span>
                <span>Date range: {uploadSummary.dateStart} to {uploadSummary.dateEnd}</span>
                <span>Columns detected: {uploadSummary.columns.length}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {uploadSummary.columns.map((col) => (
                  <span key={col} className="px-2 py-1 rounded-md text-xs" style={{ backgroundColor: WOLT_BG_SUBTLE, color: WOLT_TEXT_SECONDARY }}>
                    {col}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4" aria-label="Wolt filters">
            <div className="flex items-center gap-2">
              <label htmlFor="wolt-filter-year" className="text-sm font-medium" style={{color: WOLT_TEXT_SECONDARY}}>🗓️ Year:</label>
              <select
                id="wolt-filter-year"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-2 rounded-lg border font-medium"
                style={{ borderColor: WOLT_BORDER, backgroundColor: WOLT_BG }}
              >
                <option value="all">All Time</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="wolt-filter-cuisine" className="text-sm font-medium" style={{color: WOLT_TEXT_SECONDARY}}>🍜 Cuisine:</label>
              <select
                id="wolt-filter-cuisine"
                value={selectedCuisine}
                onChange={(e) => setSelectedCuisine(e.target.value)}
                className="px-3 py-2 rounded-lg border font-medium"
                style={{ borderColor: WOLT_BORDER, backgroundColor: WOLT_BG }}
              >
                <option value="all">All Cuisines</option>
                {allCuisines.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="wolt-filter-restaurant" className="text-sm font-medium" style={{color: WOLT_TEXT_SECONDARY}}>🏪 Restaurant:</label>
              <select
                id="wolt-filter-restaurant"
                value={selectedRestaurant}
                onChange={(e) => setSelectedRestaurant(e.target.value)}
                className="px-3 py-2 rounded-lg border font-medium max-w-48"
                style={{ borderColor: WOLT_BORDER, backgroundColor: WOLT_BG }}
              >
                <option value="all">All Restaurants</option>
                {allRestaurants.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 rounded-lg font-medium transition-colors"
                style={{ backgroundColor: WOLT_DANGER, color: 'white' }}
              >
                Clear Filters
              </button>
            )}

            {uploadedCSV && (
              <label className="flex items-center gap-2 text-sm" style={{ color: WOLT_TEXT_SECONDARY }}>
                <input
                  type="checkbox"
                  checked={excludeOutliers}
                  onChange={(e) => setExcludeOutliers(e.target.checked)}
                />
                Exclude high-spend outliers
              </label>
            )}

            <button
              onClick={() => setShowDataTables((prev) => !prev)}
              className="px-3 py-2 rounded-lg text-sm"
              style={{ backgroundColor: WOLT_BG, border: `1px solid ${WOLT_BORDER}`, color: WOLT_TEXT_SECONDARY }}
            >
              {showDataTables ? 'Hide' : 'Show'} chart data tables
            </button>
          </div>

          {hasActiveFilters && (
            <div className="mt-3 text-sm" style={{color: WOLT_BLUE}}>
              Showing {filteredData.length} of {analysisData.length} orders
            </div>
          )}
          {excludeOutliers && removedOutlierCount > 0 && (
            <div className="mt-1 text-sm" style={{ color: WOLT_WARNING }}>
              Excluded {removedOutlierCount} outlier rows and recalculated insights.
            </div>
          )}
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'TOTAL SPENT', value: formatCurrency(stats.totalSpent), icon: '💸' },
            { label: 'TOTAL ORDERS', value: stats.totalOrders, icon: '📦' },
            { label: 'AVG ORDER', value: formatCurrency(stats.avgOrder), icon: '📊' },
            { label: 'RESTAURANTS', value: stats.uniqueRestaurants, icon: '🏪' },
          ].map((stat, i) => (
            <div key={i} className="p-4 md:p-6 text-center rounded-2xl transition-all" style={{ backgroundColor: WOLT_BLUE_LIGHT, border: `1px solid ${WOLT_BORDER}` }}>
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-black" style={{color: WOLT_BLUE}}>{stat.value}</div>
              <div className="text-xs mt-1 font-medium" style={{color: WOLT_TEXT_SECONDARY}}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* NEW: Delivery Fee & Wolt+ Calculator */}
        <div className="mb-6 p-5 rounded-2xl" style={{ background: 'linear-gradient(135deg, #009DE0 0%, #007BB5 100%)' }}>
          <h3 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
            <span>🚚</span> Delivery Fee Analysis & Wolt+ Calculator
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl text-center" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
              <div className="text-2xl font-bold text-white">€{stats.estimatedDeliveryFees.toFixed(2)}</div>
              <div className="text-sm text-white opacity-80">Est. Delivery Fees Paid</div>
              <div className="text-xs text-white opacity-60">({stats.totalOrders} × €{ESTIMATED_DELIVERY_FEE})</div>
            </div>
            <div className="p-4 rounded-xl text-center" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
              <div className="text-2xl font-bold text-white">€{stats.woltPlusCost.toFixed(2)}</div>
              <div className="text-sm text-white opacity-80">Wolt+ Would Cost</div>
              <div className="text-xs text-white opacity-60">({stats.woltPlusMonths} months × €{WOLT_PLUS_MONTHLY})</div>
            </div>
            <div className="p-4 rounded-xl text-center" style={{ backgroundColor: stats.potentialSavings > 0 ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)' }}>
              <div className="text-2xl font-bold text-white">
                {stats.potentialSavings > 0 ? '+' : ''}€{stats.potentialSavings.toFixed(2)}
              </div>
              <div className="text-sm text-white opacity-80">
                {stats.potentialSavings > 0 ? 'Potential Savings' : 'Wolt+ Not Worth It'}
              </div>
            </div>
            <div className="p-4 rounded-xl text-center" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
              <div className="text-2xl font-bold text-white">{(stats.totalOrders / stats.woltPlusMonths).toFixed(1)}</div>
              <div className="text-sm text-white opacity-80">Orders/Month Avg</div>
              <div className="text-xs text-white opacity-60">{(stats.totalOrders / stats.woltPlusMonths) >= 4 ? '✅ Wolt+ recommended' : '❌ Not enough orders'}</div>
            </div>
          </div>
        </div>

        {/* NEW: Month-over-Month Comparison */}
        {monthComparison && (
          <div className="mb-6 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4" style={{ backgroundColor: WOLT_BG_SUBTLE, border: `1px solid ${WOLT_BORDER}` }}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{monthComparison.change > 0 ? '📈' : '📉'}</span>
              <div>
                <div className="font-bold" style={{color: WOLT_TEXT}}>Month-over-Month</div>
                <div className="text-sm" style={{color: WOLT_TEXT_SECONDARY}}>
                  {formatMonth(monthComparison.previous.month)} → {formatMonth(monthComparison.current.month)}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-lg font-bold" style={{color: WOLT_TEXT_SECONDARY}}>€{monthComparison.previous.amount.toFixed(2)}</div>
                <div className="text-xs" style={{color: WOLT_TEXT_SECONDARY}}>Previous</div>
              </div>
              <div className="text-2xl">→</div>
              <div className="text-center">
                <div className="text-lg font-bold" style={{color: WOLT_BLUE}}>€{monthComparison.current.amount.toFixed(2)}</div>
                <div className="text-xs" style={{color: WOLT_TEXT_SECONDARY}}>Current</div>
              </div>
              <div className="text-center px-4 py-2 rounded-lg" style={{ backgroundColor: monthComparison.change > 0 ? 'rgba(239,68,68,0.1)' : 'rgba(34,197,94,0.1)' }}>
                <div className="text-lg font-bold" style={{color: monthComparison.change > 0 ? WOLT_DANGER : WOLT_SUCCESS}}>
                  {monthComparison.change > 0 ? '+' : ''}{monthComparison.change.toFixed(1)}%
                </div>
                <div className="text-xs" style={{color: WOLT_TEXT_SECONDARY}}>Change</div>
              </div>
            </div>
          </div>
        )}

        {monthlyBenchmarks && (
          <div className="mb-6 p-4 rounded-2xl" style={{ backgroundColor: WOLT_BG_SUBTLE, border: `1px solid ${WOLT_BORDER}` }}>
            <h3 className="text-lg font-bold mb-3" style={{ color: WOLT_TEXT }}>Meaningful Baselines</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="p-3 rounded-lg" style={{ backgroundColor: WOLT_BG }}>
                <div className="text-xs" style={{ color: WOLT_TEXT_SECONDARY }}>Current month</div>
                <div className="text-lg font-bold" style={{ color: WOLT_BLUE }}>€{monthlyBenchmarks.current.amount.toFixed(2)}</div>
                <div className="text-xs" style={{ color: WOLT_TEXT_SECONDARY }}>{formatMonth(monthlyBenchmarks.current.month)}</div>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: WOLT_BG }}>
                <div className="text-xs" style={{ color: WOLT_TEXT_SECONDARY }}>Last month</div>
                <div className="text-lg font-bold" style={{ color: WOLT_TEXT }}>
                  {monthlyBenchmarks.previous ? `€${monthlyBenchmarks.previous.amount.toFixed(2)}` : 'n/a'}
                </div>
                {monthlyBenchmarks.vsPrevious !== null && (
                  <div className="text-xs" style={{ color: monthlyBenchmarks.vsPrevious > 0 ? WOLT_DANGER : WOLT_SUCCESS }}>
                    {monthlyBenchmarks.vsPrevious > 0 ? '+' : ''}{monthlyBenchmarks.vsPrevious.toFixed(1)}% vs last month
                  </div>
                )}
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: WOLT_BG }}>
                <div className="text-xs" style={{ color: WOLT_TEXT_SECONDARY }}>3-month average</div>
                <div className="text-lg font-bold" style={{ color: WOLT_TEXT }}>€{monthlyBenchmarks.rollingAvg.toFixed(2)}</div>
                <div className="text-xs" style={{ color: monthlyBenchmarks.vsRollingAvg > 0 ? WOLT_DANGER : WOLT_SUCCESS }}>
                  {monthlyBenchmarks.vsRollingAvg > 0 ? '+' : ''}{monthlyBenchmarks.vsRollingAvg.toFixed(1)}% vs 3-month avg
                </div>
              </div>
              <div className="p-3 rounded-lg" style={{ backgroundColor: WOLT_BG }}>
                <div className="text-xs" style={{ color: WOLT_TEXT_SECONDARY }}>Personal best month</div>
                <div className="text-lg font-bold" style={{ color: WOLT_SUCCESS }}>€{monthlyBenchmarks.personalBest.amount.toFixed(2)}</div>
                <div className="text-xs" style={{ color: WOLT_TEXT_SECONDARY }}>
                  {formatMonth(monthlyBenchmarks.personalBest.month)} ({monthlyBenchmarks.vsBest > 0 ? '+' : ''}{monthlyBenchmarks.vsBest.toFixed(1)}% now)
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl" style={{ backgroundColor: WOLT_BG, border: `1px solid ${WOLT_BORDER}` }}>
            <h3 className="text-lg font-bold mb-3" style={{ color: WOLT_TEXT }}>Automated Insight Summary</h3>
            <ul className="space-y-2 text-sm" style={{ color: WOLT_TEXT_SECONDARY }}>
              {automatedInsights.map((insight) => (
                <li key={insight}>• {insight}</li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-2xl" style={{ backgroundColor: WOLT_BG, border: `1px solid ${WOLT_BORDER}` }}>
            <h3 className="text-lg font-bold mb-3" style={{ color: WOLT_TEXT }}>Anomaly Alerts</h3>
            {anomalyAlerts.length > 0 ? (
              <div className="space-y-2">
                {anomalyAlerts.map((alert) => (
                  <div
                    key={alert.title}
                    className="p-3 rounded-xl"
                    style={{
                      backgroundColor: alert.severity === 'high'
                        ? 'rgba(239,68,68,0.08)'
                        : alert.severity === 'medium'
                          ? 'rgba(245,158,11,0.10)'
                          : 'rgba(34,197,94,0.10)',
                      border: `1px solid ${alert.severity === 'high' ? WOLT_DANGER : alert.severity === 'medium' ? WOLT_WARNING : WOLT_SUCCESS}`
                    }}
                  >
                    <div className="text-sm font-semibold" style={{ color: WOLT_TEXT }}>{alert.title}</div>
                    <div className="text-sm" style={{ color: WOLT_TEXT_SECONDARY }}>{alert.detail}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm" style={{ color: WOLT_TEXT_SECONDARY }}>
                No strong anomalies detected. Your recent behavior is within normal range.
              </p>
            )}
          </div>
        </div>

        {showDataTables && (
          <div className="mb-6 p-5 rounded-2xl overflow-x-auto" style={{ backgroundColor: WOLT_BG, border: `1px solid ${WOLT_BORDER}` }}>
            <h3 className="text-lg font-bold mb-4" style={{ color: WOLT_TEXT }}>Chart Data Tables</h3>

            <div className="mb-4">
              <h4 className="font-semibold mb-2" style={{ color: WOLT_TEXT }}>Monthly Trend</h4>
              <table className="min-w-full text-sm">
                <thead>
                  <tr style={{ color: WOLT_TEXT_SECONDARY }}>
                    <th className="text-left pr-4">Month</th>
                    <th className="text-left pr-4">Spent (€)</th>
                    <th className="text-left">Orders</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyData.map((row) => (
                    <tr key={row.month}>
                      <td className="pr-4">{row.month}</td>
                      <td className="pr-4">{row.amount.toFixed(2)}</td>
                      <td>{row.orders}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold mb-2" style={{ color: WOLT_TEXT }}>Cuisine Breakdown</h4>
              <table className="min-w-full text-sm">
                <thead>
                  <tr style={{ color: WOLT_TEXT_SECONDARY }}>
                    <th className="text-left pr-4">Cuisine</th>
                    <th className="text-left pr-4">Orders</th>
                    <th className="text-left">Spent (€)</th>
                  </tr>
                </thead>
                <tbody>
                  {cuisineData.map((row) => (
                    <tr key={row.name}>
                      <td className="pr-4">{row.name}</td>
                      <td className="pr-4">{row.orders}</td>
                      <td>{row.value.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold mb-2" style={{ color: WOLT_TEXT }}>Top Restaurants</h4>
              <table className="min-w-full text-sm">
                <thead>
                  <tr style={{ color: WOLT_TEXT_SECONDARY }}>
                    <th className="text-left pr-4">Restaurant</th>
                    <th className="text-left">Orders</th>
                  </tr>
                </thead>
                <tbody>
                  {topRestaurants.map((row) => (
                    <tr key={row.name}>
                      <td className="pr-4">{row.name}</td>
                      <td>{row.orders}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-5 text-center rounded-2xl" style={{ backgroundColor: WOLT_BG_SUBTLE, border: `1px solid ${WOLT_BORDER}` }}>
            <div className="text-2xl mb-1">🏆</div>
            <div className="text-sm font-medium" style={{color: WOLT_TEXT_SECONDARY}}>BIGGEST ORDER</div>
            <div className="text-xl font-bold" style={{color: WOLT_BLUE}}>{formatCurrency(stats.maxOrder)}</div>
            <div className="text-xs" style={{color: WOLT_TEXT_SECONDARY}}>{stats.maxOrderItem?.Restaurant}</div>
          </div>
          <div className="p-5 text-center rounded-2xl" style={{ backgroundColor: WOLT_BG_SUBTLE, border: `1px solid ${WOLT_BORDER}` }}>
            <div className="text-2xl mb-1">❤️</div>
            <div className="text-sm font-medium" style={{color: WOLT_TEXT_SECONDARY}}>FAVORITE SPOT</div>
            <div className="text-xl font-bold" style={{color: WOLT_BLUE}}>{stats.topRestaurant?.[0]?.slice(0, 18)}</div>
            <div className="text-xs" style={{color: WOLT_TEXT_SECONDARY}}>{stats.topRestaurant?.[1]} orders</div>
          </div>
          <div className="p-5 text-center rounded-2xl" style={{ backgroundColor: WOLT_BG_SUBTLE, border: `1px solid ${WOLT_BORDER}` }}>
            <div className="text-2xl mb-1">📈</div>
            <div className="text-sm font-medium" style={{color: WOLT_TEXT_SECONDARY}}>ORDERS/MONTH</div>
            <div className="text-xl font-bold" style={{color: WOLT_BLUE}}>{(stats.totalOrders / Math.max(monthlyData.length, 1)).toFixed(1)}</div>
            <div className="text-xs" style={{color: WOLT_TEXT_SECONDARY}}>avg frequency</div>
          </div>
        </div>

        {/* NEW: Restaurant Churn Analysis */}
        <div className="mb-6 p-5 rounded-2xl" style={{ backgroundColor: WOLT_BG, border: `1px solid ${WOLT_BORDER}` }}>
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setShowChurnAnalysis(!showChurnAnalysis)}
          >
            <h3 className="text-lg font-bold flex items-center gap-2" style={{color: WOLT_TEXT}}>
              <span>👻</span> Restaurant Churn Analysis
              <span className="text-sm font-normal px-2 py-1 rounded-full" style={{backgroundColor: WOLT_WARNING, color: 'white'}}>
                {churnAnalysis.abandoned.length} abandoned
              </span>
            </h3>
            <span className="text-xl">{showChurnAnalysis ? '▼' : '▶'}</span>
          </div>

          {showChurnAnalysis && (
            <div className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-3" style={{color: WOLT_TEXT_SECONDARY}}>🚪 Recently Abandoned (3+ orders, no visit in 6 months)</h4>
                  {churnAnalysis.abandoned.length > 0 ? (
                    <div className="space-y-2">
                      {churnAnalysis.abandoned.map((r, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-lg" style={{backgroundColor: WOLT_BG_SUBTLE}}>
                          <div>
                            <div className="font-medium" style={{color: WOLT_TEXT}}>{r.name}</div>
                            <div className="text-xs" style={{color: WOLT_TEXT_SECONDARY}}>{r.totalOrders} orders total</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium" style={{color: WOLT_DANGER}}>{r.daysSince} days ago</div>
                            <div className="text-xs" style={{color: WOLT_TEXT_SECONDARY}}>Last: {r.lastOrder}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm" style={{color: WOLT_TEXT_SECONDARY}}>No abandoned restaurants found! You're loyal 🎉</p>
                  )}
                </div>
                <div className="p-4 rounded-xl" style={{backgroundColor: WOLT_BLUE_LIGHT}}>
                  <h4 className="font-medium mb-3" style={{color: WOLT_BLUE}}>📊 Loyalty Stats</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span style={{color: WOLT_TEXT_SECONDARY}}>One-hit wonders:</span>
                      <span className="font-bold" style={{color: WOLT_TEXT}}>{churnAnalysis.oneHitWonders} restaurants</span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{color: WOLT_TEXT_SECONDARY}}>Exploration rate:</span>
                      <span className="font-bold" style={{color: WOLT_TEXT}}>
                        {stats.uniqueRestaurants > 0 ? ((churnAnalysis.oneHitWonders / stats.uniqueRestaurants) * 100).toFixed(1) : '0.0'}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{color: WOLT_TEXT_SECONDARY}}>Repeat order rate:</span>
                      <span className="font-bold" style={{color: WOLT_SUCCESS}}>
                        {stats.uniqueRestaurants > 0 ? (100 - (churnAnalysis.oneHitWonders / stats.uniqueRestaurants) * 100).toFixed(1) : '0.0'}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="p-5 rounded-2xl" style={{ backgroundColor: WOLT_BG, border: `1px solid ${WOLT_BORDER}` }}>
            <h3 className="text-lg font-bold mb-4" style={{color: WOLT_TEXT}}>📈 Monthly Spending Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="woltGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={WOLT_BLUE} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={WOLT_BLUE} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={WOLT_BORDER} />
                <XAxis dataKey="month" tickFormatter={formatMonth} tick={{fill: WOLT_TEXT_SECONDARY, fontSize: 10}} interval="preserveStartEnd" />
                <YAxis tick={{fill: WOLT_TEXT_SECONDARY, fontSize: 10}} tickFormatter={v => `€${v}`} />
                <Tooltip contentStyle={{background: WOLT_BG, border: `1px solid ${WOLT_BLUE}`, borderRadius: 12}} formatter={(v) => [`€${v.toFixed(2)}`, 'Spent']} labelFormatter={formatMonth} />
                <Area type="monotone" dataKey="amount" stroke={WOLT_BLUE} strokeWidth={2} fill="url(#woltGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="p-5 rounded-2xl" style={{ backgroundColor: WOLT_BG, border: `1px solid ${WOLT_BORDER}` }}>
            <h3 className="text-lg font-bold mb-4" style={{color: WOLT_TEXT}}>🗓️ Orders by Day of Week</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={dayOfWeekData}>
                <CartesianGrid strokeDasharray="3 3" stroke={WOLT_BORDER} />
                <XAxis dataKey="day" tick={{fill: WOLT_TEXT_SECONDARY, fontSize: 10}} tickFormatter={d => d.slice(0,3)} />
                <YAxis tick={{fill: WOLT_TEXT_SECONDARY, fontSize: 10}} />
                <Tooltip contentStyle={{background: WOLT_BG, border: `1px solid ${WOLT_BLUE}`, borderRadius: 12}} />
                <Bar dataKey="orders" fill={WOLT_BLUE} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* IMPROVED: Cuisine Chart with Legend */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="p-5 rounded-2xl" style={{ backgroundColor: WOLT_BG, border: `1px solid ${WOLT_BORDER}` }}>
            <h3 className="text-lg font-bold mb-4" style={{color: WOLT_TEXT}}>🍕 Cuisine Breakdown</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={cuisineData.slice(0, 8)}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {cuisineData.slice(0, 8).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{background: WOLT_BG, border: `1px solid ${WOLT_BLUE}`, borderRadius: 12}} formatter={(v) => [`€${v}`, 'Total Spent']} />
              </PieChart>
            </ResponsiveContainer>
            {/* Legend below chart */}
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {cuisineData.slice(0, 8).map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-1 text-xs">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: CHART_COLORS[index % CHART_COLORS.length]}} />
                  <span style={{color: WOLT_TEXT_SECONDARY}}>{entry.name} ({entry.orders})</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl" style={{ backgroundColor: WOLT_BG, border: `1px solid ${WOLT_BORDER}` }}>
            <h3 className="text-lg font-bold mb-4" style={{color: WOLT_TEXT}}>🏪 Top 10 Restaurants</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topRestaurants} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={WOLT_BORDER} />
                <XAxis type="number" tick={{fill: WOLT_TEXT_SECONDARY, fontSize: 10}} />
                <YAxis type="category" dataKey="name" tick={{fill: WOLT_TEXT_SECONDARY, fontSize: 9}} width={100} />
                <Tooltip contentStyle={{background: WOLT_BG, border: `1px solid ${WOLT_BLUE}`, borderRadius: 12}} />
                <Bar dataKey="orders" fill={WOLT_BLUE} radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top 3 Restaurants Deep Dive */}
        <div className="p-5 rounded-2xl mb-6" style={{ backgroundColor: WOLT_BG, border: `1px solid ${WOLT_BORDER}` }}>
          <h3 className="text-lg font-bold mb-2" style={{color: WOLT_TEXT}}>📊 Top 3 Restaurants: Order Development Over Time</h3>
          <p className="text-sm mb-4" style={{color: WOLT_TEXT_SECONDARY}}>
            Quarterly order frequency for your most visited spots: {top3RestaurantsTrend.restaurants.join(', ')}
          </p>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={top3RestaurantsTrend.data}>
              <defs>
                <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_COLORS[0]} stopOpacity={0.4}/>
                  <stop offset="95%" stopColor={CHART_COLORS[0]} stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="gradient2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_COLORS[1]} stopOpacity={0.4}/>
                  <stop offset="95%" stopColor={CHART_COLORS[1]} stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="gradient3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={CHART_COLORS[2]} stopOpacity={0.4}/>
                  <stop offset="95%" stopColor={CHART_COLORS[2]} stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={WOLT_BORDER} />
              <XAxis dataKey="quarter" tick={{fill: WOLT_TEXT_SECONDARY, fontSize: 10}} interval="preserveStartEnd" />
              <YAxis tick={{fill: WOLT_TEXT_SECONDARY, fontSize: 10}} allowDecimals={false} />
              <Tooltip contentStyle={{background: WOLT_BG, border: `1px solid ${WOLT_BLUE}`, borderRadius: 12}} />
              <Legend />
              {top3RestaurantsTrend.restaurants.map((name, idx) => (
                <Area
                  key={name}
                  type="monotone"
                  dataKey={name}
                  stroke={CHART_COLORS[idx]}
                  strokeWidth={2}
                  fill={`url(#gradient${idx + 1})`}
                  name={name.length > 25 ? name.slice(0, 25) + '...' : name}
                />
              ))}
            </AreaChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {top3RestaurantsTrend.restaurants.map((name, idx) => {
              const restaurantOrders = analysisData.filter(d => d.Restaurant === name);
              const totalSpent = restaurantOrders.reduce((sum, d) => sum + d.Amount, 0);
              const firstOrder = restaurantOrders[0]?.Date;
              const lastOrder = restaurantOrders[restaurantOrders.length - 1]?.Date;
              return (
                <div key={name} className="p-3 rounded-xl text-center" style={{backgroundColor: WOLT_BG_SUBTLE, border: `2px solid ${CHART_COLORS[idx]}`}}>
                  <div className="text-sm font-bold mb-1" style={{color: CHART_COLORS[idx]}}>{name.length > 20 ? name.slice(0, 20) + '...' : name}</div>
                  <div className="text-xs" style={{color: WOLT_TEXT_SECONDARY}}>
                    <div><strong>{restaurantOrders.length}</strong> orders</div>
                    <div><strong>€{totalSpent.toFixed(2)}</strong> total</div>
                    <div>€{(totalSpent / restaurantOrders.length).toFixed(2)} avg</div>
                    <div className="mt-1 text-xs" style={{color: WOLT_TEXT_SECONDARY}}>{firstOrder} → {lastOrder}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="p-5 rounded-2xl" style={{ backgroundColor: WOLT_BG, border: `1px solid ${WOLT_BORDER}` }}>
            <h3 className="text-lg font-bold mb-4" style={{color: WOLT_TEXT}}>⏰ Order Time Distribution</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={hourData}>
                <CartesianGrid strokeDasharray="3 3" stroke={WOLT_BORDER} />
                <XAxis dataKey="hour" tick={{fill: WOLT_TEXT_SECONDARY, fontSize: 9}} tickFormatter={h => `${h}h`} />
                <YAxis tick={{fill: WOLT_TEXT_SECONDARY, fontSize: 10}} />
                <Tooltip contentStyle={{background: WOLT_BG, border: `1px solid ${WOLT_BLUE}`, borderRadius: 12}} labelFormatter={(h) => `${h}:00 - ${h}:59`} />
                <Bar dataKey="orders" fill={WOLT_BLUE} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-5 rounded-2xl" style={{ backgroundColor: WOLT_BG, border: `1px solid ${WOLT_BORDER}` }}>
            <h3 className="text-lg font-bold mb-4" style={{color: WOLT_TEXT}}>📅 Year-over-Year Comparison</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={yearlyComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke={WOLT_BORDER} />
                <XAxis dataKey="year" tick={{fill: WOLT_TEXT_SECONDARY, fontSize: 10}} />
                <YAxis tick={{fill: WOLT_TEXT_SECONDARY, fontSize: 10}} tickFormatter={v => `€${v}`} />
                <Tooltip contentStyle={{background: WOLT_BG, border: `1px solid ${WOLT_BLUE}`, borderRadius: 12}} formatter={(v, n) => [n === 'amount' ? `€${v.toFixed(2)}` : `${v} orders`, n === 'amount' ? 'Spent' : 'Orders']} />
                <Bar dataKey="amount" fill={WOLT_BLUE_DARK} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Nerdy Stats */}
        <div className="p-6 rounded-2xl mb-6" style={{ backgroundColor: WOLT_BLUE_LIGHT, border: `1px solid ${WOLT_BORDER}` }}>
          <h3 className="text-xl font-bold mb-6 text-center" style={{color: WOLT_BLUE}}>🤓 NERDY DEEP DIVE STATS</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Cost per Day', value: `€${(stats.totalSpent / filteredDaysSpan).toFixed(2)}`, desc: 'if spread evenly' },
              { label: 'Peak Hour', value: `${hourData.reduce((a, b) => a.orders > b.orders ? a : b).hour}:00`, desc: 'most orders' },
              { label: 'Busiest Day', value: dayOfWeekData.reduce((a, b) => a.orders > b.orders ? a : b).day, desc: 'by order count' },
              { label: 'Variety Score', value: `${((stats.uniqueRestaurants / stats.totalOrders) * 100).toFixed(1)}%`, desc: 'unique/total' },
              { label: 'Avg Weekend', value: `€${(dayOfWeekData.filter(d => ['Saturday', 'Sunday'].includes(d.day)).reduce((s, d) => s + d.amount, 0) / Math.max(dayOfWeekData.filter(d => ['Saturday', 'Sunday'].includes(d.day)).reduce((s, d) => s + d.orders, 0), 1)).toFixed(2)}`, desc: 'Sat & Sun' },
              { label: 'Avg Weekday', value: `€${(dayOfWeekData.filter(d => !['Saturday', 'Sunday'].includes(d.day)).reduce((s, d) => s + d.amount, 0) / Math.max(dayOfWeekData.filter(d => !['Saturday', 'Sunday'].includes(d.day)).reduce((s, d) => s + d.orders, 0), 1)).toFixed(2)}`, desc: 'Mon-Fri' },
              { label: 'Late Night', value: `${hourData.filter(h => h.hour >= 20 || h.hour < 6).reduce((s, h) => s + h.orders, 0)}`, desc: '8pm-6am orders' },
              { label: 'Lunch Rush', value: `${hourData.filter(h => h.hour >= 11 && h.hour <= 14).reduce((s, h) => s + h.orders, 0)}`, desc: '11am-2pm' },
            ].map((stat, i) => (
              <div key={i} className="rounded-xl p-4 text-center" style={{background: WOLT_BG, border: `1px solid ${WOLT_BORDER}`}}>
                <div className="text-xl font-bold" style={{color: CHART_COLORS[i % CHART_COLORS.length]}}>{stat.value}</div>
                <div className="text-sm mt-1 font-medium" style={{color: WOLT_TEXT}}>{stat.label}</div>
                <div className="text-xs" style={{color: WOLT_TEXT_SECONDARY}}>{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* IMPROVED: Collapsible EXTREME NERDY STATS */}
        <div className="p-6 rounded-2xl mb-6" style={{ backgroundColor: '#1a1a2e', border: `2px solid ${WOLT_BLUE}` }}>
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setShowNerdMode(!showNerdMode)}
          >
            <h3 className="text-2xl font-black flex items-center gap-2" style={{color: '#00ff88'}}>
              🧠 EXTREME NERD MODE 🧠
            </h3>
            <div className="flex items-center gap-2">
              <span className="text-sm px-3 py-1 rounded-full" style={{backgroundColor: 'rgba(0,255,136,0.2)', color: '#00ff88'}}>
                {showNerdMode ? 'Click to collapse' : 'Click to expand'}
              </span>
              <span className="text-2xl text-white">{showNerdMode ? '▼' : '▶'}</span>
            </div>
          </div>
          <p className="text-center text-sm mt-2" style={{color: '#888'}}>Statistical deep-dive for the data-obsessed</p>

          {showNerdMode && (
            <>
              {/* Statistical Analysis */}
              <div className="mt-6 mb-8">
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2" style={{color: '#00d4ff'}}>
                  <span>📊</span> Statistical Analysis
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {(() => {
                    const amounts = filteredData.map(d => d.Amount).sort((a, b) => a - b);
                    const mean = stats.avgOrder;
                    const median = amounts[Math.floor(amounts.length / 2)] || 0;
                    const stdDev = Math.sqrt(amounts.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / amounts.length) || 0;
                    const p25 = amounts[Math.floor(amounts.length * 0.25)] || 0;
                    const p75 = amounts[Math.floor(amounts.length * 0.75)] || 0;
                    const p90 = amounts[Math.floor(amounts.length * 0.90)] || 0;
                    const iqr = p75 - p25;
                    const skewness = amounts.reduce((sum, val) => sum + Math.pow((val - mean) / stdDev, 3), 0) / amounts.length || 0;
                    return [
                      { label: 'Median Order', value: `€${median.toFixed(2)}`, desc: '50th percentile' },
                      { label: 'Std Deviation', value: `€${stdDev.toFixed(2)}`, desc: 'order volatility' },
                      { label: 'IQR', value: `€${iqr.toFixed(2)}`, desc: 'interquartile range' },
                      { label: '90th Percentile', value: `€${p90.toFixed(2)}`, desc: 'big orders' },
                      { label: 'Skewness', value: skewness.toFixed(2), desc: skewness > 0 ? 'right-skewed' : 'left-skewed' },
                    ].map((stat, i) => (
                      <div key={i} className="rounded-lg p-3 text-center" style={{background: 'rgba(0,157,224,0.1)', border: '1px solid rgba(0,157,224,0.3)'}}>
                        <div className="text-lg font-bold" style={{color: '#00ff88'}}>{stat.value}</div>
                        <div className="text-xs font-medium" style={{color: '#fff'}}>{stat.label}</div>
                        <div className="text-xs" style={{color: '#666'}}>{stat.desc}</div>
                      </div>
                    ));
                  })()}
                </div>
              </div>

              {/* Behavioral Patterns */}
              <div className="mb-8">
                <h4 className="text-lg font-bold mb-4 flex items-center gap-2" style={{color: '#ff6b6b'}}>
                  <span>🎯</span> Behavioral Patterns
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {(() => {
                    const dateGroups = {};
                    filteredData.forEach(d => {
                      dateGroups[d.Date] = (dateGroups[d.Date] || 0) + 1;
                    });
                    const maxOrdersInDay = Math.max(...Object.values(dateGroups), 0);
                    const multiOrderDays = Object.values(dateGroups).filter(v => v > 1).length;

                    const dailySpend = {};
                    filteredData.forEach(d => {
                      dailySpend[d.Date] = (dailySpend[d.Date] || 0) + d.Amount;
                    });
                    const biggestSpendDay = Math.max(...Object.values(dailySpend), 0);

                    const weekendOrders = filteredData.filter(d => ['Saturday', 'Sunday'].includes(d.DayOfWeek)).length;
                    const weekendRatio = ((weekendOrders / filteredData.length) * 100) || 0;

                    const dinnerOrders = filteredData.filter(d => d.Hour >= 17 && d.Hour <= 21).length;
                    const lunchOrders = filteredData.filter(d => d.Hour >= 11 && d.Hour <= 14).length;

                    const fridayOrders = filteredData.filter(d => d.DayOfWeek === 'Friday').length;
                    const sundayOrders = filteredData.filter(d => d.DayOfWeek === 'Sunday').length;

                    return [
                      { label: 'Max Orders/Day', value: maxOrdersInDay, desc: 'hungry day record', icon: '🔥' },
                      { label: 'Multi-Order Days', value: multiOrderDays, desc: 'days with 2+ orders', icon: '📦' },
                      { label: 'Biggest Day Spend', value: `€${biggestSpendDay.toFixed(2)}`, desc: 'single day record', icon: '💸' },
                      { label: 'Weekend Warrior', value: `${weekendRatio.toFixed(1)}%`, desc: 'orders on Sat/Sun', icon: '🏖️' },
                      { label: 'Dinner vs Lunch', value: `${(dinnerOrders/Math.max(lunchOrders,1)).toFixed(1)}x`, desc: `${dinnerOrders} vs ${lunchOrders}`, icon: '🌙' },
                      { label: 'Friday Energy', value: fridayOrders, desc: 'TGIF orders', icon: '🎉' },
                      { label: 'Sunday Chill', value: sundayOrders, desc: 'lazy Sunday orders', icon: '😴' },
                      { label: 'Avg Days Between', value: `${(filteredDaysSpan / Math.max(filteredData.length, 1)).toFixed(1)}`, desc: 'order frequency', icon: '📅' },
                    ].map((stat, i) => (
                      <div key={i} className="rounded-lg p-3 text-center" style={{background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)'}}>
                        <div className="text-2xl mb-1">{stat.icon}</div>
                        <div className="text-lg font-bold" style={{color: '#ff6b6b'}}>{stat.value}</div>
                        <div className="text-xs font-medium" style={{color: '#fff'}}>{stat.label}</div>
                        <div className="text-xs" style={{color: '#666'}}>{stat.desc}</div>
                      </div>
                    ));
                  })()}
                </div>
              </div>

              {/* Fun Facts Footer */}
              <div className="mt-6 p-4 rounded-xl text-center" style={{background: 'rgba(0,157,224,0.2)', border: '1px dashed rgba(0,157,224,0.5)'}}>
                <p className="text-sm" style={{color: '#00d4ff'}}>
                  🎲 Fun Fact: You've spent enough on Wolt to buy approximately <strong>{Math.floor(stats.totalSpent / 15)}</strong> döner kebabs,
                  or <strong>{Math.floor(stats.totalSpent / 3.5)}</strong> espressos,
                  or <strong>{(stats.totalSpent / 850).toFixed(1)}</strong> months of Netflix Premium.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center pb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full" style={{backgroundColor: WOLT_BLUE}}></div>
            <p style={{color: WOLT_TEXT_SECONDARY}}>Powered by your Wolt order history</p>
            <div className="w-3 h-3 rounded-full" style={{backgroundColor: WOLT_BLUE}}></div>
          </div>
          <p className="text-sm" style={{color: WOLT_TEXT_SECONDARY}}>{data.length} orders analyzed • {years[0]} - {years[years.length-1]} • Enhanced Edition</p>
        </footer>
      </div>
    </div>
  );
}
