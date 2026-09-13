import Papa from 'papaparse';
import * as XLSX from 'xlsx';

/**
 * Rich, pre-packaged Demo Financial Dataset.
 * Includes explicit Country data for interactive World Map GeoMap visualization.
 */
export const EMBEDDED_DEMO_DATASET = [
  { Date: '2023-02-16', Revenue: 141519, Expenses: 66414, Profit: 75105, ProfitMargin: 53.1, Category: 'Software', Region: 'Latin America', Country: 'Colombia', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 450, Cost: 66414, TransactionCount: 481 },
  { Date: '2025-10-16', Revenue: 148641, Expenses: 85906, Profit: 62735, ProfitMargin: 42.2, Category: 'Software', Region: 'Latin America', Country: 'Colombia', CustomerSegment: 'Enterprise', SalesChannel: 'Retail', UnitsSold: 676, Cost: 85906, TransactionCount: 639 },
  { Date: '2024-03-16', Revenue: 221831, Expenses: 120179, Profit: 101652, ProfitMargin: 45.8, Category: 'Software', Region: 'Europe', Country: 'Netherlands', CustomerSegment: 'SMB', SalesChannel: 'Online', UnitsSold: 865, Cost: 120179, TransactionCount: 823 },
  { Date: '2026-07-16', Revenue: 375725, Expenses: 232678, Profit: 143047, ProfitMargin: 38.1, Category: 'Services', Region: 'Europe', Country: 'Netherlands', CustomerSegment: 'SMB', SalesChannel: 'Partner', UnitsSold: 1744, Cost: 232678, TransactionCount: 1457 },
  { Date: '2026-02-16', Revenue: 93684, Expenses: 66389, Profit: 27295, ProfitMargin: 29.1, Category: 'Hardware', Region: 'Europe', Country: 'Romania', CustomerSegment: 'Enterprise', SalesChannel: 'Partner', UnitsSold: 277, Cost: 66389, TransactionCount: 252 },
  { Date: '2026-06-01', Revenue: 115590, Expenses: 92026, Profit: 23564, ProfitMargin: 20.4, Category: 'Hardware', Region: 'Europe', Country: 'Romania', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 342, Cost: 92026, TransactionCount: 356 },
  { Date: '2026-07-16', Revenue: 29934, Expenses: 21967, Profit: 7967, ProfitMargin: 26.6, Category: 'Hardware', Region: 'Africa', Country: 'Niger', CustomerSegment: 'Government', SalesChannel: 'Online', UnitsSold: 157, Cost: 21967, TransactionCount: 157 },
  { Date: '2024-07-01', Revenue: 19189, Expenses: 13052, Profit: 6137, ProfitMargin: 32.0, Category: 'Hardware', Region: 'Africa', Country: 'Niger', CustomerSegment: 'Government', SalesChannel: 'Online', UnitsSold: 70, Cost: 13052, TransactionCount: 71 },
  { Date: '2026-07-16', Revenue: 28568, Expenses: 21594, Profit: 6974, ProfitMargin: 24.4, Category: 'Hardware', Region: 'Africa', Country: 'Sأ£o Tomأ© and Principe', CustomerSegment: 'Enterprise', SalesChannel: 'Retail', UnitsSold: 91, Cost: 21594, TransactionCount: 78 },
  { Date: '2024-02-01', Revenue: 18451, Expenses: 12230, Profit: 6221, ProfitMargin: 33.7, Category: 'Services', Region: 'Africa', Country: 'Sأ£o Tomأ© and Principe', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 63, Cost: 12230, TransactionCount: 65 },
  { Date: '2025-06-01', Revenue: 24791, Expenses: 11717, Profit: 13074, ProfitMargin: 52.7, Category: 'Software', Region: 'Middle East', Country: 'Yemen', CustomerSegment: 'SMB', SalesChannel: 'Online', UnitsSold: 93, Cost: 11717, TransactionCount: 79 },
  { Date: '2025-10-01', Revenue: 24626, Expenses: 14697, Profit: 9929, ProfitMargin: 40.3, Category: 'Cloud', Region: 'Middle East', Country: 'Yemen', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 85, Cost: 14697, TransactionCount: 76 },
  { Date: '2023-07-01', Revenue: 39063, Expenses: 20359, Profit: 18704, ProfitMargin: 47.9, Category: 'Cloud', Region: 'Asia Pacific', Country: 'Myanmar', CustomerSegment: 'SMB', SalesChannel: 'Online', UnitsSold: 152, Cost: 20359, TransactionCount: 122 },
  { Date: '2024-08-01', Revenue: 40328, Expenses: 27786, Profit: 12542, ProfitMargin: 31.1, Category: 'Hardware', Region: 'Asia Pacific', Country: 'Myanmar', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 125, Cost: 27786, TransactionCount: 127 },
  { Date: '2025-08-16', Revenue: 20947, Expenses: 12246, Profit: 8701, ProfitMargin: 41.5, Category: 'Services', Region: 'Africa', Country: 'Guinea-Bissau', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 74, Cost: 12246, TransactionCount: 75 },
  { Date: '2024-02-01', Revenue: 15872, Expenses: 9679, Profit: 6193, ProfitMargin: 39.0, Category: 'Consulting', Region: 'Africa', Country: 'Guinea-Bissau', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 56, Cost: 9679, TransactionCount: 57 },
  { Date: '2023-01-16', Revenue: 16108, Expenses: 8248, Profit: 7860, ProfitMargin: 48.8, Category: 'Software', Region: 'Asia Pacific', Country: 'Afghanistan', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 58, Cost: 8248, TransactionCount: 51 },
  { Date: '2025-05-16', Revenue: 28163, Expenses: 14222, Profit: 13941, ProfitMargin: 49.5, Category: 'Software', Region: 'Asia Pacific', Country: 'Afghanistan', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 84, Cost: 14222, TransactionCount: 71 },
  { Date: '2025-02-01', Revenue: 20368, Expenses: 11475, Profit: 8893, ProfitMargin: 43.7, Category: 'Services', Region: 'North America', Country: 'Guyana', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 69, Cost: 11475, TransactionCount: 60 },
  { Date: '2024-11-16', Revenue: 18110, Expenses: 13511, Profit: 4599, ProfitMargin: 25.4, Category: 'Hardware', Region: 'North America', Country: 'Guyana', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 53, Cost: 13511, TransactionCount: 52 },
  { Date: '2024-06-16', Revenue: 21990, Expenses: 10287, Profit: 11703, ProfitMargin: 53.2, Category: 'Software', Region: 'Africa', Country: 'Mozambique', CustomerSegment: 'Consumer', SalesChannel: 'Online', UnitsSold: 77, Cost: 10287, TransactionCount: 77 },
  { Date: '2024-10-01', Revenue: 20253, Expenses: 10663, Profit: 9590, ProfitMargin: 47.4, Category: 'Software', Region: 'Africa', Country: 'Mozambique', CustomerSegment: 'Enterprise', SalesChannel: 'Partner', UnitsSold: 101, Cost: 10663, TransactionCount: 110 },
  { Date: '2026-07-01', Revenue: 26739, Expenses: 14789, Profit: 11950, ProfitMargin: 44.7, Category: 'Software', Region: 'Africa', Country: 'Zambia', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 116, Cost: 14789, TransactionCount: 97 },
  { Date: '2026-08-16', Revenue: 23224, Expenses: 12134, Profit: 11090, ProfitMargin: 47.8, Category: 'Cloud', Region: 'Africa', Country: 'Zambia', CustomerSegment: 'Consumer', SalesChannel: 'Partner', UnitsSold: 108, Cost: 12134, TransactionCount: 112 },
  { Date: '2024-03-16', Revenue: 132512, Expenses: 94706, Profit: 37806, ProfitMargin: 28.5, Category: 'Hardware', Region: 'Africa', Country: 'Egypt', CustomerSegment: 'Consumer', SalesChannel: 'Direct Sales', UnitsSold: 416, Cost: 94706, TransactionCount: 355 },
  { Date: '2025-01-01', Revenue: 118437, Expenses: 68315, Profit: 50122, ProfitMargin: 42.3, Category: 'Services', Region: 'Africa', Country: 'Egypt', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 467, Cost: 68315, TransactionCount: 491 },
  { Date: '2025-05-01', Revenue: 19820, Expenses: 10418, Profit: 9402, ProfitMargin: 47.4, Category: 'Software', Region: 'Asia Pacific', Country: 'Nepal', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 73, Cost: 10418, TransactionCount: 64 },
  { Date: '2026-04-16', Revenue: 22098, Expenses: 15621, Profit: 6477, ProfitMargin: 29.3, Category: 'Hardware', Region: 'Asia Pacific', Country: 'Nepal', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 122, Cost: 15621, TransactionCount: 121 },
  { Date: '2025-11-01', Revenue: 118433, Expenses: 93138, Profit: 25295, ProfitMargin: 21.4, Category: 'Hardware', Region: 'Asia Pacific', Country: 'Vietnam', CustomerSegment: 'Government', SalesChannel: 'Online', UnitsSold: 387, Cost: 93138, TransactionCount: 407 },
  { Date: '2026-08-16', Revenue: 159719, Expenses: 96606, Profit: 63113, ProfitMargin: 39.5, Category: 'Cloud', Region: 'Asia Pacific', Country: 'Vietnam', CustomerSegment: 'SMB', SalesChannel: 'Retail', UnitsSold: 679, Cost: 96606, TransactionCount: 730 },
  { Date: '2023-11-01', Revenue: 13032, Expenses: 10057, Profit: 2975, ProfitMargin: 22.8, Category: 'Hardware', Region: 'Africa', Country: 'Eritrea', CustomerSegment: 'SMB', SalesChannel: 'Online', UnitsSold: 55, Cost: 10057, TransactionCount: 49 },
  { Date: '2024-05-16', Revenue: 19307, Expenses: 11153, Profit: 8154, ProfitMargin: 42.2, Category: 'Services', Region: 'Africa', Country: 'Eritrea', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 68, Cost: 11153, TransactionCount: 55 },
  { Date: '2025-03-01', Revenue: 17696, Expenses: 11863, Profit: 5833, ProfitMargin: 33.0, Category: 'Services', Region: 'Africa', Country: 'Djibouti', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 63, Cost: 11863, TransactionCount: 66 },
  { Date: '2024-06-16', Revenue: 17568, Expenses: 10335, Profit: 7233, ProfitMargin: 41.2, Category: 'Services', Region: 'Africa', Country: 'Djibouti', CustomerSegment: 'Consumer', SalesChannel: 'Direct Sales', UnitsSold: 56, Cost: 10335, TransactionCount: 59 },
  { Date: '2025-04-16', Revenue: 17671, Expenses: 10678, Profit: 6993, ProfitMargin: 39.6, Category: 'Cloud', Region: 'Asia Pacific', Country: 'Mongolia', CustomerSegment: 'Enterprise', SalesChannel: 'Partner', UnitsSold: 55, Cost: 10678, TransactionCount: 57 },
  { Date: '2025-10-01', Revenue: 17332, Expenses: 13564, Profit: 3768, ProfitMargin: 21.7, Category: 'Hardware', Region: 'Asia Pacific', Country: 'Mongolia', CustomerSegment: 'Consumer', SalesChannel: 'Partner', UnitsSold: 73, Cost: 13564, TransactionCount: 66 },
  { Date: '2026-09-16', Revenue: 82504, Expenses: 55417, Profit: 27087, ProfitMargin: 32.8, Category: 'Hardware', Region: 'Latin America', Country: 'Ecuador', CustomerSegment: 'Consumer', SalesChannel: 'Direct Sales', UnitsSold: 322, Cost: 55417, TransactionCount: 354 },
  { Date: '2025-08-16', Revenue: 62404, Expenses: 40547, Profit: 21857, ProfitMargin: 35.0, Category: 'Consulting', Region: 'Latin America', Country: 'Ecuador', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 310, Cost: 40547, TransactionCount: 257 },
  { Date: '2023-10-01', Revenue: 13762, Expenses: 8367, Profit: 5395, ProfitMargin: 39.2, Category: 'Cloud', Region: 'Africa', Country: 'Guinea', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 60, Cost: 8367, TransactionCount: 55 },
  { Date: '2026-07-16', Revenue: 16824, Expenses: 9359, Profit: 7465, ProfitMargin: 44.4, Category: 'Software', Region: 'Africa', Country: 'Guinea', CustomerSegment: 'Enterprise', SalesChannel: 'Partner', UnitsSold: 51, Cost: 9359, TransactionCount: 48 },
  { Date: '2024-12-01', Revenue: 161815, Expenses: 96568, Profit: 65247, ProfitMargin: 40.3, Category: 'Consulting', Region: 'Middle East', Country: 'Qatar', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 601, Cost: 96568, TransactionCount: 490 },
  { Date: '2026-05-01', Revenue: 255335, Expenses: 155830, Profit: 99505, ProfitMargin: 39.0, Category: 'Services', Region: 'Middle East', Country: 'Qatar', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 1373, Cost: 155830, TransactionCount: 1285 },
  { Date: '2025-08-16', Revenue: 49355, Expenses: 28851, Profit: 20504, ProfitMargin: 41.5, Category: 'Cloud', Region: 'Europe', Country: 'Luxembourg', CustomerSegment: 'Government', SalesChannel: 'Partner', UnitsSold: 160, Cost: 28851, TransactionCount: 145 },
  { Date: '2023-03-16', Revenue: 34641, Expenses: 16640, Profit: 18001, ProfitMargin: 52.0, Category: 'Software', Region: 'Europe', Country: 'Luxembourg', CustomerSegment: 'Enterprise', SalesChannel: 'Partner', UnitsSold: 99, Cost: 16640, TransactionCount: 82 },
  { Date: '2026-07-01', Revenue: 43320, Expenses: 25020, Profit: 18300, ProfitMargin: 42.2, Category: 'Cloud', Region: 'Latin America', Country: 'Paraguay', CustomerSegment: 'Consumer', SalesChannel: 'Online', UnitsSold: 141, Cost: 25020, TransactionCount: 118 },
  { Date: '2024-09-16', Revenue: 31550, Expenses: 15849, Profit: 15701, ProfitMargin: 49.8, Category: 'Software', Region: 'Latin America', Country: 'Paraguay', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 129, Cost: 15849, TransactionCount: 121 },
  { Date: '2023-12-01', Revenue: 97421, Expenses: 58933, Profit: 38488, ProfitMargin: 39.5, Category: 'Services', Region: 'Latin America', Country: 'Peru', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 435, Cost: 58933, TransactionCount: 460 },
  { Date: '2025-11-16', Revenue: 145031, Expenses: 84371, Profit: 60660, ProfitMargin: 41.8, Category: 'Services', Region: 'Latin America', Country: 'Peru', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 635, Cost: 84371, TransactionCount: 509 },
  { Date: '2023-12-01', Revenue: 16145, Expenses: 9178, Profit: 6967, ProfitMargin: 43.1, Category: 'Services', Region: 'Africa', Country: 'Rwanda', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 75, Cost: 9178, TransactionCount: 76 },
  { Date: '2026-05-16', Revenue: 29828, Expenses: 17622, Profit: 12206, ProfitMargin: 40.9, Category: 'Cloud', Region: 'Africa', Country: 'Rwanda', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 103, Cost: 17622, TransactionCount: 90 },
  { Date: '2025-07-16', Revenue: 109537, Expenses: 78227, Profit: 31310, ProfitMargin: 28.6, Category: 'Hardware', Region: 'Europe', Country: 'Norway', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 428, Cost: 78227, TransactionCount: 417 },
  { Date: '2023-11-01', Revenue: 77247, Expenses: 40710, Profit: 36537, ProfitMargin: 47.3, Category: 'Software', Region: 'Europe', Country: 'Norway', CustomerSegment: 'SMB', SalesChannel: 'Partner', UnitsSold: 298, Cost: 40710, TransactionCount: 293 },
  { Date: '2026-05-16', Revenue: 61161, Expenses: 29141, Profit: 32020, ProfitMargin: 52.4, Category: 'Software', Region: 'Latin America', Country: 'Bolivia', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 181, Cost: 29141, TransactionCount: 194 },
  { Date: '2023-05-01', Revenue: 33807, Expenses: 16855, Profit: 16952, ProfitMargin: 50.1, Category: 'Software', Region: 'Latin America', Country: 'Bolivia', CustomerSegment: 'SMB', SalesChannel: 'Online', UnitsSold: 162, Cost: 16855, TransactionCount: 138 },
  { Date: '2026-03-01', Revenue: 44336, Expenses: 21017, Profit: 23319, ProfitMargin: 52.6, Category: 'Software', Region: 'Asia Pacific', Country: 'Uzbekistan', CustomerSegment: 'SMB', SalesChannel: 'Retail', UnitsSold: 182, Cost: 21017, TransactionCount: 190 },
  { Date: '2026-01-01', Revenue: 36679, Expenses: 21000, Profit: 15679, ProfitMargin: 42.7, Category: 'Services', Region: 'Asia Pacific', Country: 'Uzbekistan', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 149, Cost: 21000, TransactionCount: 153 },
  { Date: '2023-04-16', Revenue: 235187, Expenses: 154368, Profit: 80819, ProfitMargin: 34.4, Category: 'Hardware', Region: 'Middle East', Country: 'United Arab Emirates', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 1101, Cost: 154368, TransactionCount: 1006 },
  { Date: '2025-11-16', Revenue: 328547, Expenses: 179778, Profit: 148769, ProfitMargin: 45.3, Category: 'Software', Region: 'Middle East', Country: 'United Arab Emirates', CustomerSegment: 'Enterprise', SalesChannel: 'Retail', UnitsSold: 1168, Cost: 179778, TransactionCount: 956 },
  { Date: '2024-02-01', Revenue: 73934, Expenses: 37259, Profit: 36675, ProfitMargin: 49.6, Category: 'Software', Region: 'Africa', Country: 'Algeria', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 252, Cost: 37259, TransactionCount: 273 },
  { Date: '2024-12-01', Revenue: 71712, Expenses: 44842, Profit: 26870, ProfitMargin: 37.5, Category: 'Services', Region: 'Africa', Country: 'Algeria', CustomerSegment: 'SMB', SalesChannel: 'Partner', UnitsSold: 334, Cost: 44842, TransactionCount: 268 },
  { Date: '2025-03-01', Revenue: 18458, Expenses: 12296, Profit: 6162, ProfitMargin: 33.4, Category: 'Hardware', Region: 'Africa', Country: 'South Sudan', CustomerSegment: 'Consumer', SalesChannel: 'Online', UnitsSold: 78, Cost: 12296, TransactionCount: 82 },
  { Date: '2023-02-16', Revenue: 13622, Expenses: 6822, Profit: 6800, ProfitMargin: 49.9, Category: 'Software', Region: 'Africa', Country: 'South Sudan', CustomerSegment: 'Consumer', SalesChannel: 'Direct Sales', UnitsSold: 53, Cost: 6822, TransactionCount: 54 },
  { Date: '2024-09-01', Revenue: 23891, Expenses: 11699, Profit: 12192, ProfitMargin: 51.0, Category: 'Software', Region: 'Africa', Country: 'Burkina Faso', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 76, Cost: 11699, TransactionCount: 79 },
  { Date: '2023-01-01', Revenue: 15277, Expenses: 10213, Profit: 5064, ProfitMargin: 33.2, Category: 'Services', Region: 'Africa', Country: 'Burkina Faso', CustomerSegment: 'Enterprise', SalesChannel: 'Retail', UnitsSold: 54, Cost: 10213, TransactionCount: 52 },
  { Date: '2025-04-01', Revenue: 44990, Expenses: 26112, Profit: 18878, ProfitMargin: 42.0, Category: 'Cloud', Region: 'Africa', Country: 'Tanzania', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 144, Cost: 26112, TransactionCount: 117 },
  { Date: '2023-03-16', Revenue: 28558, Expenses: 19342, Profit: 9216, ProfitMargin: 32.3, Category: 'Hardware', Region: 'Africa', Country: 'Tanzania', CustomerSegment: 'Consumer', SalesChannel: 'Direct Sales', UnitsSold: 152, Cost: 19342, TransactionCount: 126 },
  { Date: '2023-01-16', Revenue: 38026, Expenses: 29866, Profit: 8160, ProfitMargin: 21.5, Category: 'Hardware', Region: 'Africa', Country: 'Kenya', CustomerSegment: 'Enterprise', SalesChannel: 'Retail', UnitsSold: 163, Cost: 29866, TransactionCount: 154 },
  { Date: '2026-08-01', Revenue: 72573, Expenses: 50806, Profit: 21767, ProfitMargin: 30.0, Category: 'Hardware', Region: 'Africa', Country: 'Kenya', CustomerSegment: 'Government', SalesChannel: 'Partner', UnitsSold: 207, Cost: 50806, TransactionCount: 218 },
  { Date: '2025-03-01', Revenue: 19081, Expenses: 12887, Profit: 6194, ProfitMargin: 32.5, Category: 'Services', Region: 'North America', Country: 'Trinidad and Tobago', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 55, Cost: 12887, TransactionCount: 59 },
  { Date: '2024-08-16', Revenue: 20424, Expenses: 12753, Profit: 7671, ProfitMargin: 37.6, Category: 'Services', Region: 'North America', Country: 'Trinidad and Tobago', CustomerSegment: 'Consumer', SalesChannel: 'Direct Sales', UnitsSold: 72, Cost: 12753, TransactionCount: 68 },
  { Date: '2023-05-01', Revenue: 38976, Expenses: 23698, Profit: 15278, ProfitMargin: 39.2, Category: 'Services', Region: 'North America', Country: 'Panama', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 125, Cost: 23698, TransactionCount: 112 },
  { Date: '2024-06-01', Revenue: 49717, Expenses: 25896, Profit: 23821, ProfitMargin: 47.9, Category: 'Software', Region: 'North America', Country: 'Panama', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 209, Cost: 25896, TransactionCount: 197 },
  { Date: '2023-03-16', Revenue: 16850, Expenses: 9029, Profit: 7821, ProfitMargin: 46.4, Category: 'Cloud', Region: 'Africa', Country: 'Seychelles', CustomerSegment: 'Government', SalesChannel: 'Online', UnitsSold: 76, Cost: 9029, TransactionCount: 66 },
  { Date: '2025-08-01', Revenue: 26170, Expenses: 15943, Profit: 10227, ProfitMargin: 39.1, Category: 'Services', Region: 'Africa', Country: 'Seychelles', CustomerSegment: 'SMB', SalesChannel: 'Partner', UnitsSold: 79, Cost: 15943, TransactionCount: 80 },
  { Date: '2025-11-16', Revenue: 16018, Expenses: 9855, Profit: 6163, ProfitMargin: 38.5, Category: 'Consulting', Region: 'Africa', Country: 'Togo', CustomerSegment: 'Consumer', SalesChannel: 'Direct Sales', UnitsSold: 78, Cost: 9855, TransactionCount: 80 },
  { Date: '2025-07-01', Revenue: 19235, Expenses: 13741, Profit: 5494, ProfitMargin: 28.6, Category: 'Hardware', Region: 'Africa', Country: 'Togo', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 79, Cost: 13741, TransactionCount: 65 },
  { Date: '2023-08-16', Revenue: 69643, Expenses: 36532, Profit: 33111, ProfitMargin: 47.5, Category: 'Software', Region: 'Africa', Country: 'Morocco', CustomerSegment: 'Government', SalesChannel: 'Direct Sales', UnitsSold: 308, Cost: 36532, TransactionCount: 281 },
  { Date: '2024-01-16', Revenue: 57352, Expenses: 40471, Profit: 16881, ProfitMargin: 29.4, Category: 'Hardware', Region: 'Africa', Country: 'Morocco', CustomerSegment: 'Consumer', SalesChannel: 'Partner', UnitsSold: 220, Cost: 40471, TransactionCount: 213 },
  { Date: '2023-12-16', Revenue: 14642, Expenses: 8841, Profit: 5801, ProfitMargin: 39.6, Category: 'Services', Region: 'Africa', Country: 'Madagascar', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 63, Cost: 8841, TransactionCount: 52 },
  { Date: '2024-12-16', Revenue: 19037, Expenses: 12216, Profit: 6821, ProfitMargin: 35.8, Category: 'Services', Region: 'Africa', Country: 'Madagascar', CustomerSegment: 'Government', SalesChannel: 'Direct Sales', UnitsSold: 81, Cost: 12216, TransactionCount: 73 },
  { Date: '2023-12-01', Revenue: 772894, Expenses: 392795, Profit: 380099, ProfitMargin: 49.2, Category: 'Software', Region: 'Asia Pacific', Country: 'Japan', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 2834, Cost: 392795, TransactionCount: 2667 },
  { Date: '2026-07-16', Revenue: 1178979, Expenses: 660312, Profit: 518667, ProfitMargin: 44.0, Category: 'Services', Region: 'Asia Pacific', Country: 'Japan', CustomerSegment: 'SMB', SalesChannel: 'Partner', UnitsSold: 4783, Cost: 660312, TransactionCount: 4520 },
  { Date: '2026-02-16', Revenue: 45944, Expenses: 32914, Profit: 13030, ProfitMargin: 28.4, Category: 'Hardware', Region: 'Asia Pacific', Country: 'Sri Lanka', CustomerSegment: 'Consumer', SalesChannel: 'Online', UnitsSold: 177, Cost: 32914, TransactionCount: 161 },
  { Date: '2023-01-01', Revenue: 28408, Expenses: 21182, Profit: 7226, ProfitMargin: 25.4, Category: 'Hardware', Region: 'Asia Pacific', Country: 'Sri Lanka', CustomerSegment: 'Enterprise', SalesChannel: 'Retail', UnitsSold: 91, Cost: 21182, TransactionCount: 91 },
  { Date: '2023-03-16', Revenue: 28296, Expenses: 16130, Profit: 12166, ProfitMargin: 43.0, Category: 'Cloud', Region: 'Middle East', Country: 'Bahrain', CustomerSegment: 'Enterprise', SalesChannel: 'Partner', UnitsSold: 84, Cost: 16130, TransactionCount: 82 },
  { Date: '2025-01-16', Revenue: 43685, Expenses: 21538, Profit: 22147, ProfitMargin: 50.7, Category: 'Software', Region: 'Middle East', Country: 'Bahrain', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 133, Cost: 21538, TransactionCount: 119 },
  { Date: '2026-05-16', Revenue: 100584, Expenses: 57867, Profit: 42717, ProfitMargin: 42.5, Category: 'Cloud', Region: 'Latin America', Country: 'Venezuela', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 306, Cost: 57867, TransactionCount: 332 },
  { Date: '2026-08-01', Revenue: 102537, Expenses: 48102, Profit: 54435, ProfitMargin: 53.1, Category: 'Software', Region: 'Latin America', Country: 'Venezuela', CustomerSegment: 'Enterprise', SalesChannel: 'Partner', UnitsSold: 299, Cost: 48102, TransactionCount: 276 },
  { Date: '2024-08-01', Revenue: 476331, Expenses: 271737, Profit: 204594, ProfitMargin: 43.0, Category: 'Services', Region: 'Middle East', Country: 'Saudi Arabia', CustomerSegment: 'Consumer', SalesChannel: 'Partner', UnitsSold: 2459, Cost: 271737, TransactionCount: 2479 },
  { Date: '2026-08-01', Revenue: 566354, Expenses: 434330, Profit: 132024, ProfitMargin: 23.3, Category: 'Hardware', Region: 'Middle East', Country: 'Saudi Arabia', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 1734, Cost: 434330, TransactionCount: 1448 },
  { Date: '2025-04-16', Revenue: 103336, Expenses: 55920, Profit: 47416, ProfitMargin: 45.9, Category: 'Cloud', Region: 'Middle East', Country: 'Iraq', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 309, Cost: 55920, TransactionCount: 324 },
  { Date: '2023-11-16', Revenue: 68825, Expenses: 44786, Profit: 24039, ProfitMargin: 34.9, Category: 'Services', Region: 'Middle East', Country: 'Iraq', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 351, Cost: 44786, TransactionCount: 362 },
  { Date: '2025-09-16', Revenue: 52135, Expenses: 33265, Profit: 18870, ProfitMargin: 36.2, Category: 'Services', Region: 'Europe', Country: 'Belarus', CustomerSegment: 'SMB', SalesChannel: 'Online', UnitsSold: 179, Cost: 33265, TransactionCount: 176 },
  { Date: '2025-03-16', Revenue: 43258, Expenses: 27729, Profit: 15529, ProfitMargin: 35.9, Category: 'Hardware', Region: 'Europe', Country: 'Belarus', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 156, Cost: 27729, TransactionCount: 162 },
  { Date: '2024-06-01', Revenue: 122645, Expenses: 81790, Profit: 40855, ProfitMargin: 33.3, Category: 'Services', Region: 'Europe', Country: 'Ireland', CustomerSegment: 'Consumer', SalesChannel: 'Online', UnitsSold: 634, Cost: 81790, TransactionCount: 561 },
  { Date: '2025-03-16', Revenue: 93120, Expenses: 53659, Profit: 39461, ProfitMargin: 42.4, Category: 'Software', Region: 'Europe', Country: 'Ireland', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 267, Cost: 53659, TransactionCount: 271 },
  { Date: '2025-03-01', Revenue: 18598, Expenses: 10728, Profit: 7870, ProfitMargin: 42.3, Category: 'Software', Region: 'Europe', Country: 'Albania', CustomerSegment: 'Consumer', SalesChannel: 'Partner', UnitsSold: 56, Cost: 10728, TransactionCount: 55 },
  { Date: '2024-07-16', Revenue: 19812, Expenses: 13092, Profit: 6720, ProfitMargin: 33.9, Category: 'Hardware', Region: 'Europe', Country: 'Albania', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 104, Cost: 13092, TransactionCount: 101 },
  { Date: '2025-09-01', Revenue: 20724, Expenses: 15602, Profit: 5122, ProfitMargin: 24.7, Category: 'Hardware', Region: 'Africa', Country: 'The Gambia', CustomerSegment: 'SMB', SalesChannel: 'Online', UnitsSold: 95, Cost: 15602, TransactionCount: 83 },
  { Date: '2026-09-01', Revenue: 26721, Expenses: 15809, Profit: 10912, ProfitMargin: 40.8, Category: 'Services', Region: 'Africa', Country: 'The Gambia', CustomerSegment: 'Enterprise', SalesChannel: 'Partner', UnitsSold: 105, Cost: 15809, TransactionCount: 86 },
  { Date: '2025-02-01', Revenue: 155238, Expenses: 90898, Profit: 64340, ProfitMargin: 41.4, Category: 'Cloud', Region: 'Middle East', Country: 'Iran', CustomerSegment: 'Consumer', SalesChannel: 'Online', UnitsSold: 501, Cost: 90898, TransactionCount: 511 },
  { Date: '2025-06-01', Revenue: 205783, Expenses: 94844, Profit: 110939, ProfitMargin: 53.9, Category: 'Software', Region: 'Middle East', Country: 'Iran', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 627, Cost: 94844, TransactionCount: 509 },
  { Date: '2024-08-16', Revenue: 18240, Expenses: 12845, Profit: 5395, ProfitMargin: 29.6, Category: 'Hardware', Region: 'Africa', Country: 'Lesotho', CustomerSegment: 'Government', SalesChannel: 'Direct Sales', UnitsSold: 59, Cost: 12845, TransactionCount: 51 },
  { Date: '2024-12-01', Revenue: 14857, Expenses: 9184, Profit: 5673, ProfitMargin: 38.2, Category: 'Services', Region: 'Africa', Country: 'Lesotho', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 50, Cost: 9184, TransactionCount: 55 },
  { Date: '2023-04-01', Revenue: 16413, Expenses: 10106, Profit: 6307, ProfitMargin: 38.4, Category: 'Consulting', Region: 'North America', Country: 'Jamaica', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 50, Cost: 10106, TransactionCount: 42 },
  { Date: '2026-06-01', Revenue: 23366, Expenses: 14466, Profit: 8900, ProfitMargin: 38.1, Category: 'Services', Region: 'North America', Country: 'Jamaica', CustomerSegment: 'Consumer', SalesChannel: 'Retail', UnitsSold: 90, Cost: 14466, TransactionCount: 89 },
  { Date: '2023-03-01', Revenue: 135295, Expenses: 64493, Profit: 70802, ProfitMargin: 52.3, Category: 'Software', Region: 'Asia Pacific', Country: 'Thailand', CustomerSegment: 'SMB', SalesChannel: 'Online', UnitsSold: 675, Cost: 64493, TransactionCount: 655 },
  { Date: '2024-12-01', Revenue: 153911, Expenses: 85287, Profit: 68624, ProfitMargin: 44.6, Category: 'Software', Region: 'Asia Pacific', Country: 'Thailand', CustomerSegment: 'SMB', SalesChannel: 'Retail', UnitsSold: 513, Cost: 85287, TransactionCount: 518 },
  { Date: '2023-10-01', Revenue: 124490, Expenses: 68044, Profit: 56446, ProfitMargin: 45.3, Category: 'Software', Region: 'Europe', Country: 'Poland', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 409, Cost: 68044, TransactionCount: 402 },
  { Date: '2024-05-01', Revenue: 170574, Expenses: 109168, Profit: 61406, ProfitMargin: 36.0, Category: 'Hardware', Region: 'Europe', Country: 'Poland', CustomerSegment: 'Consumer', SalesChannel: 'Direct Sales', UnitsSold: 581, Cost: 109168, TransactionCount: 634 },
  { Date: '2025-02-16', Revenue: 16930, Expenses: 9512, Profit: 7418, ProfitMargin: 43.8, Category: 'Services', Region: 'Africa', Country: 'Mauritius', CustomerSegment: 'Government', SalesChannel: 'Direct Sales', UnitsSold: 65, Cost: 9512, TransactionCount: 61 },
  { Date: '2024-09-01', Revenue: 17171, Expenses: 9959, Profit: 7212, ProfitMargin: 42.0, Category: 'Services', Region: 'Africa', Country: 'Mauritius', CustomerSegment: 'Enterprise', SalesChannel: 'Partner', UnitsSold: 71, Cost: 9959, TransactionCount: 73 },
  { Date: '2023-12-16', Revenue: 333758, Expenses: 214791, Profit: 118967, ProfitMargin: 35.6, Category: 'Services', Region: 'Asia Pacific', Country: 'Australia', CustomerSegment: 'SMB', SalesChannel: 'Partner', UnitsSold: 1494, Cost: 214791, TransactionCount: 1523 },
  { Date: '2024-10-16', Revenue: 414069, Expenses: 197072, Profit: 216997, ProfitMargin: 52.4, Category: 'Software', Region: 'Asia Pacific', Country: 'Australia', CustomerSegment: 'SMB', SalesChannel: 'Online', UnitsSold: 1749, Cost: 197072, TransactionCount: 1417 },
  { Date: '2026-09-16', Revenue: 27159, Expenses: 20671, Profit: 6488, ProfitMargin: 23.9, Category: 'Hardware', Region: 'Africa', Country: 'Equatorial Guinea', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 139, Cost: 20671, TransactionCount: 113 },
  { Date: '2025-06-01', Revenue: 25638, Expenses: 13532, Profit: 12106, ProfitMargin: 47.2, Category: 'Software', Region: 'Africa', Country: 'Equatorial Guinea', CustomerSegment: 'Government', SalesChannel: 'Online', UnitsSold: 89, Cost: 13532, TransactionCount: 72 },
  { Date: '2024-04-16', Revenue: 16690, Expenses: 8945, Profit: 7745, ProfitMargin: 46.4, Category: 'Cloud', Region: 'Africa', Country: 'Cameroon', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 54, Cost: 8945, TransactionCount: 51 },
  { Date: '2024-12-16', Revenue: 16681, Expenses: 8231, Profit: 8450, ProfitMargin: 50.7, Category: 'Software', Region: 'Africa', Country: 'Cameroon', CustomerSegment: 'SMB', SalesChannel: 'Online', UnitsSold: 52, Cost: 8231, TransactionCount: 55 },
  { Date: '2024-11-16', Revenue: 45921, Expenses: 27673, Profit: 18248, ProfitMargin: 39.7, Category: 'Services', Region: 'Europe', Country: 'Ukraine', CustomerSegment: 'Government', SalesChannel: 'Direct Sales', UnitsSold: 172, Cost: 27673, TransactionCount: 139 },
  { Date: '2024-10-16', Revenue: 45956, Expenses: 21955, Profit: 24001, ProfitMargin: 52.2, Category: 'Software', Region: 'Europe', Country: 'Ukraine', CustomerSegment: 'Consumer', SalesChannel: 'Online', UnitsSold: 197, Cost: 21955, TransactionCount: 159 },
  { Date: '2024-12-16', Revenue: 1507025, Expenses: 806707, Profit: 700318, ProfitMargin: 46.5, Category: 'Consulting', Region: 'Asia Pacific', Country: 'China', CustomerSegment: 'Consumer', SalesChannel: 'Partner', UnitsSold: 6108, Cost: 806707, TransactionCount: 6456 },
  { Date: '2023-05-16', Revenue: 1391051, Expenses: 823414, Profit: 567637, ProfitMargin: 40.8, Category: 'Cloud', Region: 'Asia Pacific', Country: 'China', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 6148, Cost: 823414, TransactionCount: 6162 },
  { Date: '2025-05-16', Revenue: 24631, Expenses: 12809, Profit: 11822, ProfitMargin: 48.0, Category: 'Cloud', Region: 'North America', Country: 'Suriname', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 110, Cost: 12809, TransactionCount: 99 },
  { Date: '2025-07-01', Revenue: 21854, Expenses: 12946, Profit: 8908, ProfitMargin: 40.8, Category: 'Services', Region: 'North America', Country: 'Suriname', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 95, Cost: 12946, TransactionCount: 96 },
  { Date: '2026-03-16', Revenue: 17201, Expenses: 9375, Profit: 7826, ProfitMargin: 45.5, Category: 'Software', Region: 'Europe', Country: 'Bosnia and Herz.', CustomerSegment: 'SMB', SalesChannel: 'Online', UnitsSold: 82, Cost: 9375, TransactionCount: 78 },
  { Date: '2026-06-16', Revenue: 21786, Expenses: 10931, Profit: 10855, ProfitMargin: 49.8, Category: 'Software', Region: 'Europe', Country: 'Bosnia and Herz.', CustomerSegment: 'Consumer', SalesChannel: 'Online', UnitsSold: 113, Cost: 10931, TransactionCount: 115 },
  { Date: '2026-02-01', Revenue: 270129, Expenses: 148972, Profit: 121157, ProfitMargin: 44.9, Category: 'Software', Region: 'Asia Pacific', Country: 'Taiwan', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 1256, Cost: 148972, TransactionCount: 1215 },
  { Date: '2023-09-01', Revenue: 171934, Expenses: 96634, Profit: 75300, ProfitMargin: 43.8, Category: 'Software', Region: 'Asia Pacific', Country: 'Taiwan', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 843, Cost: 96634, TransactionCount: 858 },
  { Date: '2025-06-16', Revenue: 101553, Expenses: 58015, Profit: 43538, ProfitMargin: 42.9, Category: 'Services', Region: 'Asia Pacific', Country: 'Hong Kong', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 471, Cost: 58015, TransactionCount: 390 },
  { Date: '2026-04-16', Revenue: 93108, Expenses: 48299, Profit: 44809, ProfitMargin: 48.1, Category: 'Cloud', Region: 'Asia Pacific', Country: 'Hong Kong', CustomerSegment: 'Consumer', SalesChannel: 'Online', UnitsSold: 428, Cost: 48299, TransactionCount: 356 },
  { Date: '2023-09-01', Revenue: 913317, Expenses: 507681, Profit: 405636, ProfitMargin: 44.4, Category: 'Software', Region: 'Europe', Country: 'Germany', CustomerSegment: 'SMB', SalesChannel: 'Partner', UnitsSold: 4183, Cost: 507681, TransactionCount: 4110 },
  { Date: '2023-06-16', Revenue: 953314, Expenses: 530616, Profit: 422698, ProfitMargin: 44.3, Category: 'Cloud', Region: 'Europe', Country: 'Germany', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 3761, Cost: 530616, TransactionCount: 3937 },
  { Date: '2026-09-16', Revenue: 110333, Expenses: 67337, Profit: 42996, ProfitMargin: 39.0, Category: 'Consulting', Region: 'Europe', Country: 'Czech Republic', CustomerSegment: 'Consumer', SalesChannel: 'Direct Sales', UnitsSold: 517, Cost: 67337, TransactionCount: 501 },
  { Date: '2025-11-01', Revenue: 82272, Expenses: 39409, Profit: 42863, ProfitMargin: 52.1, Category: 'Software', Region: 'Europe', Country: 'Czech Republic', CustomerSegment: 'Enterprise', SalesChannel: 'Partner', UnitsSold: 260, Cost: 39409, TransactionCount: 261 },
  { Date: '2023-10-16', Revenue: 18419, Expenses: 9696, Profit: 8723, ProfitMargin: 47.4, Category: 'Cloud', Region: 'Africa', Country: 'Uganda', CustomerSegment: 'Consumer', SalesChannel: 'Online', UnitsSold: 78, Cost: 9696, TransactionCount: 73 },
  { Date: '2025-05-01', Revenue: 23306, Expenses: 18182, Profit: 5124, ProfitMargin: 22.0, Category: 'Hardware', Region: 'Africa', Country: 'Uganda', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 82, Cost: 18182, TransactionCount: 73 },
  { Date: '2023-12-01', Revenue: 18127, Expenses: 11375, Profit: 6752, ProfitMargin: 37.3, Category: 'Services', Region: 'Europe', Country: 'North Macedonia', CustomerSegment: 'Government', SalesChannel: 'Direct Sales', UnitsSold: 52, Cost: 11375, TransactionCount: 55 },
  { Date: '2025-09-01', Revenue: 26793, Expenses: 13171, Profit: 13622, ProfitMargin: 50.8, Category: 'Software', Region: 'Europe', Country: 'North Macedonia', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 132, Cost: 13171, TransactionCount: 139 },
  { Date: '2025-07-01', Revenue: 67894, Expenses: 44024, Profit: 23870, ProfitMargin: 35.2, Category: 'Services', Region: 'Asia Pacific', Country: 'New Zealand', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 274, Cost: 44024, TransactionCount: 295 },
  { Date: '2023-12-16', Revenue: 41096, Expenses: 25232, Profit: 15864, ProfitMargin: 38.6, Category: 'Services', Region: 'Asia Pacific', Country: 'New Zealand', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 145, Cost: 25232, TransactionCount: 140 },
  { Date: '2023-03-01', Revenue: 16734, Expenses: 10416, Profit: 6318, ProfitMargin: 37.8, Category: 'Consulting', Region: 'Africa', Country: 'Sierra Leone', CustomerSegment: 'SMB', SalesChannel: 'Online', UnitsSold: 70, Cost: 10416, TransactionCount: 65 },
  { Date: '2026-06-01', Revenue: 21748, Expenses: 16397, Profit: 5351, ProfitMargin: 24.6, Category: 'Hardware', Region: 'Africa', Country: 'Sierra Leone', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 88, Cost: 16397, TransactionCount: 73 },
  { Date: '2025-08-16', Revenue: 1851477, Expenses: 964245, Profit: 887232, ProfitMargin: 47.9, Category: 'Cloud', Region: 'North America', Country: 'United States', CustomerSegment: 'SMB', SalesChannel: 'Partner', UnitsSold: 7331, Cost: 964245, TransactionCount: 7859 },
  { Date: '2025-07-16', Revenue: 2177171, Expenses: 1153006, Profit: 1024165, ProfitMargin: 47.0, Category: 'Cloud', Region: 'North America', Country: 'United States', CustomerSegment: 'Consumer', SalesChannel: 'Direct Sales', UnitsSold: 7298, Cost: 1153006, TransactionCount: 6855 },
  { Date: '2025-07-16', Revenue: 78210, Expenses: 47601, Profit: 30609, ProfitMargin: 39.1, Category: 'Cloud', Region: 'Asia Pacific', Country: 'Bangladesh', CustomerSegment: 'SMB', SalesChannel: 'Partner', UnitsSold: 227, Cost: 47601, TransactionCount: 237 },
  { Date: '2026-02-01', Revenue: 81573, Expenses: 46492, Profit: 35081, ProfitMargin: 43.0, Category: 'Cloud', Region: 'Asia Pacific', Country: 'Bangladesh', CustomerSegment: 'Enterprise', SalesChannel: 'Partner', UnitsSold: 291, Cost: 46492, TransactionCount: 247 },
  { Date: '2024-03-01', Revenue: 19802, Expenses: 11709, Profit: 8093, ProfitMargin: 40.9, Category: 'Consulting', Region: 'Africa', Country: 'Benin', CustomerSegment: 'Consumer', SalesChannel: 'Online', UnitsSold: 58, Cost: 11709, TransactionCount: 51 },
  { Date: '2025-08-01', Revenue: 25792, Expenses: 15723, Profit: 10069, ProfitMargin: 39.0, Category: 'Cloud', Region: 'Africa', Country: 'Benin', CustomerSegment: 'SMB', SalesChannel: 'Online', UnitsSold: 74, Cost: 15723, TransactionCount: 67 },
  { Date: '2023-10-01', Revenue: 703486, Expenses: 464954, Profit: 238532, ProfitMargin: 33.9, Category: 'Consulting', Region: 'Asia Pacific', Country: 'India', CustomerSegment: 'SMB', SalesChannel: 'Retail', UnitsSold: 3121, Cost: 464954, TransactionCount: 2524 },
  { Date: '2024-11-16', Revenue: 790525, Expenses: 593370, Profit: 197155, ProfitMargin: 24.9, Category: 'Hardware', Region: 'Asia Pacific', Country: 'India', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 2760, Cost: 593370, TransactionCount: 2930 },
  { Date: '2026-04-16', Revenue: 202429, Expenses: 115812, Profit: 86617, ProfitMargin: 42.8, Category: 'Software', Region: 'Asia Pacific', Country: 'Singapore', CustomerSegment: 'Enterprise', SalesChannel: 'Partner', UnitsSold: 1037, Cost: 115812, TransactionCount: 1037 },
  { Date: '2025-05-16', Revenue: 192987, Expenses: 110251, Profit: 82736, ProfitMargin: 42.9, Category: 'Cloud', Region: 'Asia Pacific', Country: 'Singapore', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 759, Cost: 110251, TransactionCount: 728 },
  { Date: '2024-11-01', Revenue: 14567, Expenses: 8218, Profit: 6349, ProfitMargin: 43.6, Category: 'Software', Region: 'Africa', Country: 'Chad', CustomerSegment: 'SMB', SalesChannel: 'Online', UnitsSold: 49, Cost: 8218, TransactionCount: 42 },
  { Date: '2023-05-16', Revenue: 14005, Expenses: 9633, Profit: 4372, ProfitMargin: 31.2, Category: 'Hardware', Region: 'Africa', Country: 'Chad', CustomerSegment: 'SMB', SalesChannel: 'Online', UnitsSold: 53, Cost: 9633, TransactionCount: 45 },
  { Date: '2023-09-16', Revenue: 767234, Expenses: 452263, Profit: 314971, ProfitMargin: 41.1, Category: 'Services', Region: 'Europe', Country: 'United Kingdom', CustomerSegment: 'Consumer', SalesChannel: 'Partner', UnitsSold: 3202, Cost: 452263, TransactionCount: 3384 },
  { Date: '2025-07-16', Revenue: 981865, Expenses: 606271, Profit: 375594, ProfitMargin: 38.3, Category: 'Services', Region: 'Europe', Country: 'United Kingdom', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 3161, Cost: 606271, TransactionCount: 3068 },
  { Date: '2023-01-01', Revenue: 61739, Expenses: 32964, Profit: 28775, ProfitMargin: 46.6, Category: 'Software', Region: 'Asia Pacific', Country: 'Kazakhstan', CustomerSegment: 'Consumer', SalesChannel: 'Direct Sales', UnitsSold: 320, Cost: 32964, TransactionCount: 347 },
  { Date: '2025-11-16', Revenue: 74143, Expenses: 34715, Profit: 39428, ProfitMargin: 53.2, Category: 'Software', Region: 'Asia Pacific', Country: 'Kazakhstan', CustomerSegment: 'Consumer', SalesChannel: 'Direct Sales', UnitsSold: 383, Cost: 34715, TransactionCount: 407 },
  { Date: '2026-09-01', Revenue: 141650, Expenses: 78071, Profit: 63579, ProfitMargin: 44.9, Category: 'Cloud', Region: 'Latin America', Country: 'Chile', CustomerSegment: 'SMB', SalesChannel: 'Retail', UnitsSold: 569, Cost: 78071, TransactionCount: 600 },
  { Date: '2025-06-01', Revenue: 146789, Expenses: 76097, Profit: 70692, ProfitMargin: 48.2, Category: 'Software', Region: 'Latin America', Country: 'Chile', CustomerSegment: 'Consumer', SalesChannel: 'Partner', UnitsSold: 800, Cost: 76097, TransactionCount: 761 },
  { Date: '2024-07-01', Revenue: 37015, Expenses: 20704, Profit: 16311, ProfitMargin: 44.1, Category: 'Cloud', Region: 'Europe', Country: 'Serbia', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 158, Cost: 20704, TransactionCount: 145 },
  { Date: '2026-04-16', Revenue: 51629, Expenses: 36245, Profit: 15384, ProfitMargin: 29.8, Category: 'Hardware', Region: 'Europe', Country: 'Serbia', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 222, Cost: 36245, TransactionCount: 207 },
  { Date: '2023-06-01', Revenue: 20133, Expenses: 11224, Profit: 8909, ProfitMargin: 44.3, Category: 'Cloud', Region: 'Africa', Country: 'Malawi', CustomerSegment: 'Enterprise', SalesChannel: 'Retail', UnitsSold: 95, Cost: 11224, TransactionCount: 78 },
  { Date: '2025-01-01', Revenue: 14762, Expenses: 7278, Profit: 7484, ProfitMargin: 50.7, Category: 'Software', Region: 'Africa', Country: 'Malawi', CustomerSegment: 'Enterprise', SalesChannel: 'Partner', UnitsSold: 53, Cost: 7278, TransactionCount: 57 },
  { Date: '2025-12-01', Revenue: 17778, Expenses: 11859, Profit: 5919, ProfitMargin: 33.3, Category: 'Hardware', Region: 'Africa', Country: 'Sudan', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 78, Cost: 11859, TransactionCount: 72 },
  { Date: '2025-10-01', Revenue: 16478, Expenses: 7792, Profit: 8686, ProfitMargin: 52.7, Category: 'Software', Region: 'Africa', Country: 'Sudan', CustomerSegment: 'Consumer', SalesChannel: 'Online', UnitsSold: 71, Cost: 7792, TransactionCount: 72 },
  { Date: '2023-07-01', Revenue: 18409, Expenses: 8647, Profit: 9762, ProfitMargin: 53.0, Category: 'Software', Region: 'North America', Country: 'Costa Rica', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 77, Cost: 8647, TransactionCount: 81 },
  { Date: '2023-04-01', Revenue: 16167, Expenses: 9540, Profit: 6627, ProfitMargin: 41.0, Category: 'Cloud', Region: 'North America', Country: 'Costa Rica', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 48, Cost: 9540, TransactionCount: 44 },
  { Date: '2024-03-16', Revenue: 16160, Expenses: 8515, Profit: 7645, ProfitMargin: 47.3, Category: 'Software', Region: 'North America', Country: 'Nicaragua', CustomerSegment: 'SMB', SalesChannel: 'Retail', UnitsSold: 54, Cost: 8515, TransactionCount: 55 },
  { Date: '2024-02-16', Revenue: 14403, Expenses: 10784, Profit: 3619, ProfitMargin: 25.1, Category: 'Hardware', Region: 'North America', Country: 'Nicaragua', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 80, Cost: 10784, TransactionCount: 82 },
  { Date: '2025-11-01', Revenue: 37809, Expenses: 22924, Profit: 14885, ProfitMargin: 39.4, Category: 'Services', Region: 'North America', Country: 'Cuba', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 177, Cost: 22924, TransactionCount: 173 },
  { Date: '2025-12-16', Revenue: 42226, Expenses: 26951, Profit: 15275, ProfitMargin: 36.2, Category: 'Services', Region: 'North America', Country: 'Cuba', CustomerSegment: 'SMB', SalesChannel: 'Online', UnitsSold: 130, Cost: 26951, TransactionCount: 128 },
  { Date: '2023-10-01', Revenue: 26928, Expenses: 16239, Profit: 10689, ProfitMargin: 39.7, Category: 'Cloud', Region: 'Africa', Country: 'Tunisia', CustomerSegment: 'SMB', SalesChannel: 'Partner', UnitsSold: 122, Cost: 16239, TransactionCount: 106 },
  { Date: '2026-02-01', Revenue: 37574, Expenses: 21466, Profit: 16108, ProfitMargin: 42.9, Category: 'Cloud', Region: 'Africa', Country: 'Tunisia', CustomerSegment: 'Enterprise', SalesChannel: 'Partner', UnitsSold: 162, Cost: 21466, TransactionCount: 170 },
  { Date: '2023-01-01', Revenue: 15769, Expenses: 10326, Profit: 5443, ProfitMargin: 34.5, Category: 'Services', Region: 'Europe', Country: 'Moldova', CustomerSegment: 'SMB', SalesChannel: 'Online', UnitsSold: 83, Cost: 10326, TransactionCount: 68 },
  { Date: '2024-05-01', Revenue: 21575, Expenses: 14003, Profit: 7572, ProfitMargin: 35.1, Category: 'Consulting', Region: 'Europe', Country: 'Moldova', CustomerSegment: 'Consumer', SalesChannel: 'Partner', UnitsSold: 62, Cost: 14003, TransactionCount: 58 },
  { Date: '2024-10-01', Revenue: 17613, Expenses: 11938, Profit: 5675, ProfitMargin: 32.2, Category: 'Services', Region: 'North America', Country: 'Honduras', CustomerSegment: 'Enterprise', SalesChannel: 'Partner', UnitsSold: 63, Cost: 11938, TransactionCount: 63 },
  { Date: '2025-10-01', Revenue: 17781, Expenses: 10645, Profit: 7136, ProfitMargin: 40.1, Category: 'Cloud', Region: 'North America', Country: 'Honduras', CustomerSegment: 'SMB', SalesChannel: 'Partner', UnitsSold: 57, Cost: 10645, TransactionCount: 62 },
  { Date: '2024-04-16', Revenue: 19004, Expenses: 9066, Profit: 9938, ProfitMargin: 52.3, Category: 'Software', Region: 'Asia Pacific', Country: 'Tajikistan', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 55, Cost: 9066, TransactionCount: 58 },
  { Date: '2026-03-16', Revenue: 22319, Expenses: 12126, Profit: 10193, ProfitMargin: 45.7, Category: 'Cloud', Region: 'Asia Pacific', Country: 'Tajikistan', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 66, Cost: 12126, TransactionCount: 65 },
  { Date: '2025-02-01', Revenue: 39404, Expenses: 20135, Profit: 19269, ProfitMargin: 48.9, Category: 'Software', Region: 'Europe', Country: 'Slovakia', CustomerSegment: 'Consumer', SalesChannel: 'Partner', UnitsSold: 131, Cost: 20135, TransactionCount: 134 },
  { Date: '2024-07-01', Revenue: 43762, Expenses: 26963, Profit: 16799, ProfitMargin: 38.4, Category: 'Consulting', Region: 'Europe', Country: 'Slovakia', CustomerSegment: 'Consumer', SalesChannel: 'Partner', UnitsSold: 134, Cost: 26963, TransactionCount: 127 },
  { Date: '2024-05-16', Revenue: 474475, Expenses: 282523, Profit: 191952, ProfitMargin: 40.5, Category: 'Cloud', Region: 'North America', Country: 'Canada', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 1755, Cost: 282523, TransactionCount: 1702 },
  { Date: '2026-06-16', Revenue: 701954, Expenses: 417912, Profit: 284042, ProfitMargin: 40.5, Category: 'Cloud', Region: 'North America', Country: 'Canada', CustomerSegment: 'Consumer', SalesChannel: 'Direct Sales', UnitsSold: 3287, Cost: 417912, TransactionCount: 3224 },
  { Date: '2026-07-16', Revenue: 294913, Expenses: 184970, Profit: 109943, ProfitMargin: 37.3, Category: 'Services', Region: 'Africa', Country: 'Nigeria', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 1579, Cost: 184970, TransactionCount: 1486 },
  { Date: '2024-05-01', Revenue: 195378, Expenses: 130994, Profit: 64384, ProfitMargin: 33.0, Category: 'Hardware', Region: 'Africa', Country: 'Nigeria', CustomerSegment: 'SMB', SalesChannel: 'Partner', UnitsSold: 696, Cost: 130994, TransactionCount: 728 },
  { Date: '2023-06-01', Revenue: 18264, Expenses: 11213, Profit: 7051, ProfitMargin: 38.6, Category: 'Services', Region: 'Asia Pacific', Country: 'Fiji', CustomerSegment: 'Enterprise', SalesChannel: 'Partner', UnitsSold: 99, Cost: 11213, TransactionCount: 108 },
  { Date: '2024-10-01', Revenue: 16225, Expenses: 10178, Profit: 6047, ProfitMargin: 37.3, Category: 'Services', Region: 'Asia Pacific', Country: 'Fiji', CustomerSegment: 'Consumer', SalesChannel: 'Online', UnitsSold: 59, Cost: 10178, TransactionCount: 50 },
  { Date: '2025-06-01', Revenue: 73833, Expenses: 38953, Profit: 34880, ProfitMargin: 47.2, Category: 'Software', Region: 'Europe', Country: 'Hungary', CustomerSegment: 'Enterprise', SalesChannel: 'Partner', UnitsSold: 232, Cost: 38953, TransactionCount: 254 },
  { Date: '2024-04-16', Revenue: 64727, Expenses: 42901, Profit: 21826, ProfitMargin: 33.7, Category: 'Consulting', Region: 'Europe', Country: 'Hungary', CustomerSegment: 'SMB', SalesChannel: 'Retail', UnitsSold: 233, Cost: 42901, TransactionCount: 240 },
  { Date: '2024-02-16', Revenue: 41843, Expenses: 27931, Profit: 13912, ProfitMargin: 33.2, Category: 'Services', Region: 'Africa', Country: 'Ghana', CustomerSegment: 'Enterprise', SalesChannel: 'Retail', UnitsSold: 211, Cost: 27931, TransactionCount: 205 },
  { Date: '2024-01-16', Revenue: 42898, Expenses: 22395, Profit: 20503, ProfitMargin: 47.8, Category: 'Cloud', Region: 'Africa', Country: 'Ghana', CustomerSegment: 'Enterprise', SalesChannel: 'Partner', UnitsSold: 138, Cost: 22395, TransactionCount: 112 },
  { Date: '2023-06-01', Revenue: 32517, Expenses: 19483, Profit: 13034, ProfitMargin: 40.1, Category: 'Services', Region: 'Europe', Country: 'Bulgaria', CustomerSegment: 'Enterprise', SalesChannel: 'Partner', UnitsSold: 95, Cost: 19483, TransactionCount: 85 },
  { Date: '2024-07-01', Revenue: 44279, Expenses: 23163, Profit: 21116, ProfitMargin: 47.7, Category: 'Cloud', Region: 'Europe', Country: 'Bulgaria', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 137, Cost: 23163, TransactionCount: 146 },
  { Date: '2024-05-01', Revenue: 18971, Expenses: 10758, Profit: 8213, ProfitMargin: 43.3, Category: 'Software', Region: 'Africa', Country: 'Swaziland', CustomerSegment: 'Consumer', SalesChannel: 'Online', UnitsSold: 74, Cost: 10758, TransactionCount: 67 },
  { Date: '2023-09-16', Revenue: 17405, Expenses: 9202, Profit: 8203, ProfitMargin: 47.1, Category: 'Software', Region: 'Africa', Country: 'Swaziland', CustomerSegment: 'SMB', SalesChannel: 'Partner', UnitsSold: 87, Cost: 9202, TransactionCount: 80 },
  { Date: '2026-01-16', Revenue: 21643, Expenses: 14434, Profit: 7209, ProfitMargin: 33.3, Category: 'Services', Region: 'Africa', Country: 'Somalia', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 94, Cost: 14434, TransactionCount: 91 },
  { Date: '2026-04-01', Revenue: 27440, Expenses: 15340, Profit: 12100, ProfitMargin: 44.1, Category: 'Consulting', Region: 'Africa', Country: 'Somalia', CustomerSegment: 'Enterprise', SalesChannel: 'Partner', UnitsSold: 114, Cost: 15340, TransactionCount: 99 },
  { Date: '2023-10-16', Revenue: 335376, Expenses: 161349, Profit: 174027, ProfitMargin: 51.9, Category: 'Software', Region: 'Asia Pacific', Country: 'South Korea', CustomerSegment: 'Enterprise', SalesChannel: 'Partner', UnitsSold: 1547, Cost: 161349, TransactionCount: 1582 },
  { Date: '2026-08-01', Revenue: 436819, Expenses: 238765, Profit: 198054, ProfitMargin: 45.3, Category: 'Cloud', Region: 'Asia Pacific', Country: 'South Korea', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 2213, Cost: 238765, TransactionCount: 2113 },
  { Date: '2023-08-01', Revenue: 108732, Expenses: 64022, Profit: 44710, ProfitMargin: 41.1, Category: 'Services', Region: 'Middle East', Country: 'Kuwait', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 454, Cost: 64022, TransactionCount: 382 },
  { Date: '2024-01-01', Revenue: 90067, Expenses: 72025, Profit: 18042, ProfitMargin: 20.0, Category: 'Hardware', Region: 'Middle East', Country: 'Kuwait', CustomerSegment: 'SMB', SalesChannel: 'Online', UnitsSold: 316, Cost: 72025, TransactionCount: 319 },
  { Date: '2025-02-16', Revenue: 86560, Expenses: 52182, Profit: 34378, ProfitMargin: 39.7, Category: 'Consulting', Region: 'Asia Pacific', Country: 'Pakistan', CustomerSegment: 'Consumer', SalesChannel: 'Online', UnitsSold: 334, Cost: 52182, TransactionCount: 305 },
  { Date: '2025-01-16', Revenue: 81162, Expenses: 42988, Profit: 38174, ProfitMargin: 47.0, Category: 'Software', Region: 'Asia Pacific', Country: 'Pakistan', CustomerSegment: 'SMB', SalesChannel: 'Online', UnitsSold: 438, Cost: 42988, TransactionCount: 475 },
  { Date: '2025-02-01', Revenue: 229427, Expenses: 127577, Profit: 101850, ProfitMargin: 44.4, Category: 'Cloud', Region: 'Asia Pacific', Country: 'Indonesia', CustomerSegment: 'Government', SalesChannel: 'Online', UnitsSold: 748, Cost: 127577, TransactionCount: 646 },
  { Date: '2026-01-16', Revenue: 258126, Expenses: 161055, Profit: 97071, ProfitMargin: 37.6, Category: 'Services', Region: 'Asia Pacific', Country: 'Indonesia', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 979, Cost: 161055, TransactionCount: 794 },
  { Date: '2025-09-16', Revenue: 119141, Expenses: 76773, Profit: 42368, ProfitMargin: 35.6, Category: 'Hardware', Region: 'Asia Pacific', Country: 'Malaysia', CustomerSegment: 'SMB', SalesChannel: 'Partner', UnitsSold: 410, Cost: 76773, TransactionCount: 408 },
  { Date: '2023-08-01', Revenue: 119996, Expenses: 72935, Profit: 47061, ProfitMargin: 39.2, Category: 'Cloud', Region: 'Asia Pacific', Country: 'Malaysia', CustomerSegment: 'SMB', SalesChannel: 'Online', UnitsSold: 563, Cost: 72935, TransactionCount: 455 },
  { Date: '2026-07-01', Revenue: 1035562, Expenses: 500021, Profit: 535541, ProfitMargin: 51.7, Category: 'Software', Region: 'Europe', Country: 'France', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 3101, Cost: 500021, TransactionCount: 3230 },
  { Date: '2023-05-01', Revenue: 602988, Expenses: 370203, Profit: 232785, ProfitMargin: 38.6, Category: 'Services', Region: 'Europe', Country: 'France', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 2231, Cost: 370203, TransactionCount: 2095 },
  { Date: '2024-03-16', Revenue: 138017, Expenses: 89151, Profit: 48866, ProfitMargin: 35.4, Category: 'Services', Region: 'Africa', Country: 'South Africa', CustomerSegment: 'SMB', SalesChannel: 'Retail', UnitsSold: 598, Cost: 89151, TransactionCount: 569 },
  { Date: '2026-06-01', Revenue: 202328, Expenses: 158459, Profit: 43869, ProfitMargin: 21.7, Category: 'Hardware', Region: 'Africa', Country: 'South Africa', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 682, Cost: 158459, TransactionCount: 557 },
  { Date: '2024-04-01', Revenue: 32025, Expenses: 14854, Profit: 17171, ProfitMargin: 53.6, Category: 'Software', Region: 'Africa', Country: 'Libya', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 99, Cost: 14854, TransactionCount: 87 },
  { Date: '2024-01-01', Revenue: 25816, Expenses: 12197, Profit: 13619, ProfitMargin: 52.8, Category: 'Software', Region: 'Africa', Country: 'Libya', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 86, Cost: 12197, TransactionCount: 84 },
  { Date: '2024-09-01', Revenue: 21394, Expenses: 10387, Profit: 11007, ProfitMargin: 51.4, Category: 'Software', Region: 'Europe', Country: 'Latvia', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 89, Cost: 10387, TransactionCount: 78 },
  { Date: '2023-09-16', Revenue: 16440, Expenses: 8002, Profit: 8438, ProfitMargin: 51.3, Category: 'Software', Region: 'Europe', Country: 'Latvia', CustomerSegment: 'Enterprise', SalesChannel: 'Partner', UnitsSold: 50, Cost: 8002, TransactionCount: 47 },
  { Date: '2024-07-01', Revenue: 22024, Expenses: 10327, Profit: 11697, ProfitMargin: 53.1, Category: 'Software', Region: 'North America', Country: 'Dominican Republic', CustomerSegment: 'Enterprise', SalesChannel: 'Partner', UnitsSold: 89, Cost: 10327, TransactionCount: 93 },
  { Date: '2023-06-16', Revenue: 18526, Expenses: 10112, Profit: 8414, ProfitMargin: 45.4, Category: 'Software', Region: 'North America', Country: 'Dominican Republic', CustomerSegment: 'SMB', SalesChannel: 'Partner', UnitsSold: 54, Cost: 10112, TransactionCount: 44 },
  { Date: '2025-01-01', Revenue: 82919, Expenses: 38648, Profit: 44271, ProfitMargin: 53.4, Category: 'Software', Region: 'Europe', Country: 'Denmark', CustomerSegment: 'Government', SalesChannel: 'Partner', UnitsSold: 240, Cost: 38648, TransactionCount: 244 },
  { Date: '2026-02-01', Revenue: 98074, Expenses: 65456, Profit: 32618, ProfitMargin: 33.3, Category: 'Services', Region: 'Europe', Country: 'Denmark', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 319, Cost: 65456, TransactionCount: 345 },
  { Date: '2026-07-16', Revenue: 23611, Expenses: 16195, Profit: 7416, ProfitMargin: 31.4, Category: 'Hardware', Region: 'North America', Country: 'Bahamas', CustomerSegment: 'Government', SalesChannel: 'Direct Sales', UnitsSold: 69, Cost: 16195, TransactionCount: 71 },
  { Date: '2024-08-16', Revenue: 19726, Expenses: 12380, Profit: 7346, ProfitMargin: 37.2, Category: 'Services', Region: 'North America', Country: 'Bahamas', CustomerSegment: 'Enterprise', SalesChannel: 'Partner', UnitsSold: 97, Cost: 12380, TransactionCount: 90 },
  { Date: '2025-11-01', Revenue: 19102, Expenses: 10671, Profit: 8431, ProfitMargin: 44.1, Category: 'Consulting', Region: 'North America', Country: 'Belize', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 76, Cost: 10671, TransactionCount: 72 },
  { Date: '2026-03-01', Revenue: 21637, Expenses: 12838, Profit: 8799, ProfitMargin: 40.7, Category: 'Services', Region: 'North America', Country: 'Belize', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 85, Cost: 12838, TransactionCount: 79 },
  { Date: '2024-08-01', Revenue: 16649, Expenses: 9120, Profit: 7529, ProfitMargin: 45.2, Category: 'Software', Region: 'Asia Pacific', Country: 'Kyrgyzstan', CustomerSegment: 'Consumer', SalesChannel: 'Direct Sales', UnitsSold: 53, Cost: 9120, TransactionCount: 51 },
  { Date: '2025-03-01', Revenue: 17694, Expenses: 9702, Profit: 7992, ProfitMargin: 45.2, Category: 'Software', Region: 'Asia Pacific', Country: 'Kyrgyzstan', CustomerSegment: 'SMB', SalesChannel: 'Online', UnitsSold: 61, Cost: 9702, TransactionCount: 55 },
  { Date: '2025-09-16', Revenue: 124043, Expenses: 69504, Profit: 54539, ProfitMargin: 44.0, Category: 'Software', Region: 'Asia Pacific', Country: 'Philippines', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 423, Cost: 69504, TransactionCount: 346 },
  { Date: '2024-05-01', Revenue: 101667, Expenses: 66851, Profit: 34816, ProfitMargin: 34.2, Category: 'Consulting', Region: 'Asia Pacific', Country: 'Philippines', CustomerSegment: 'SMB', SalesChannel: 'Retail', UnitsSold: 348, Cost: 66851, TransactionCount: 287 },
  { Date: '2024-01-16', Revenue: 15284, Expenses: 10134, Profit: 5150, ProfitMargin: 33.7, Category: 'Consulting', Region: 'Africa', Country: 'Cape Verde', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 72, Cost: 10134, TransactionCount: 63 },
  { Date: '2025-07-16', Revenue: 23053, Expenses: 13460, Profit: 9593, ProfitMargin: 41.6, Category: 'Consulting', Region: 'Africa', Country: 'Cape Verde', CustomerSegment: 'Government', SalesChannel: 'Online', UnitsSold: 68, Cost: 13460, TransactionCount: 73 },
  { Date: '2025-09-01', Revenue: 17958, Expenses: 8360, Profit: 9598, ProfitMargin: 53.4, Category: 'Software', Region: 'Asia Pacific', Country: 'Laos', CustomerSegment: 'Government', SalesChannel: 'Direct Sales', UnitsSold: 84, Cost: 8360, TransactionCount: 84 },
  { Date: '2025-01-16', Revenue: 18635, Expenses: 12429, Profit: 6206, ProfitMargin: 33.3, Category: 'Services', Region: 'Asia Pacific', Country: 'Laos', CustomerSegment: 'SMB', SalesChannel: 'Online', UnitsSold: 61, Cost: 12429, TransactionCount: 65 },
  { Date: '2023-06-01', Revenue: 390675, Expenses: 237380, Profit: 153295, ProfitMargin: 39.2, Category: 'Services', Region: 'Europe', Country: 'Spain', CustomerSegment: 'Enterprise', SalesChannel: 'Retail', UnitsSold: 1143, Cost: 237380, TransactionCount: 1102 },
  { Date: '2024-03-16', Revenue: 321909, Expenses: 149392, Profit: 172517, ProfitMargin: 53.6, Category: 'Software', Region: 'Europe', Country: 'Spain', CustomerSegment: 'SMB', SalesChannel: 'Partner', UnitsSold: 1571, Cost: 149392, TransactionCount: 1414 },
  { Date: '2024-05-16', Revenue: 17382, Expenses: 11646, Profit: 5736, ProfitMargin: 33.0, Category: 'Hardware', Region: 'Europe', Country: 'Slovenia', CustomerSegment: 'Enterprise', SalesChannel: 'Partner', UnitsSold: 67, Cost: 11646, TransactionCount: 68 },
  { Date: '2025-09-01', Revenue: 17464, Expenses: 9758, Profit: 7706, ProfitMargin: 44.1, Category: 'Software', Region: 'Europe', Country: 'Slovenia', CustomerSegment: 'Consumer', SalesChannel: 'Partner', UnitsSold: 56, Cost: 9758, TransactionCount: 50 },
  { Date: '2026-01-16', Revenue: 792317, Expenses: 607750, Profit: 184567, ProfitMargin: 23.3, Category: 'Hardware', Region: 'Latin America', Country: 'Brazil', CustomerSegment: 'Enterprise', SalesChannel: 'Partner', UnitsSold: 3653, Cost: 607750, TransactionCount: 3132 },
  { Date: '2024-06-01', Revenue: 736137, Expenses: 470075, Profit: 266062, ProfitMargin: 36.1, Category: 'Services', Region: 'Latin America', Country: 'Brazil', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 2243, Cost: 470075, TransactionCount: 2408 },
  { Date: '2024-02-16', Revenue: 129087, Expenses: 64304, Profit: 64783, ProfitMargin: 50.2, Category: 'Software', Region: 'Europe', Country: 'Belgium', CustomerSegment: 'Enterprise', SalesChannel: 'Partner', UnitsSold: 533, Cost: 64304, TransactionCount: 551 },
  { Date: '2026-06-01', Revenue: 189898, Expenses: 105877, Profit: 84021, ProfitMargin: 44.2, Category: 'Cloud', Region: 'Europe', Country: 'Belgium', CustomerSegment: 'Consumer', SalesChannel: 'Online', UnitsSold: 1050, Cost: 105877, TransactionCount: 1000 },
  { Date: '2023-08-01', Revenue: 16217, Expenses: 9887, Profit: 6330, ProfitMargin: 39.0, Category: 'Cloud', Region: 'Middle East', Country: 'Syria', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 65, Cost: 9887, TransactionCount: 67 },
  { Date: '2025-06-16', Revenue: 16507, Expenses: 11016, Profit: 5491, ProfitMargin: 33.3, Category: 'Consulting', Region: 'Middle East', Country: 'Syria', CustomerSegment: 'Consumer', SalesChannel: 'Direct Sales', UnitsSold: 59, Cost: 11016, TransactionCount: 57 },
  { Date: '2024-06-16', Revenue: 74943, Expenses: 37850, Profit: 37093, ProfitMargin: 49.5, Category: 'Software', Region: 'Europe', Country: 'Portugal', CustomerSegment: 'SMB', SalesChannel: 'Online', UnitsSold: 320, Cost: 37850, TransactionCount: 339 },
  { Date: '2024-07-01', Revenue: 75218, Expenses: 57078, Profit: 18140, ProfitMargin: 24.1, Category: 'Hardware', Region: 'Europe', Country: 'Portugal', CustomerSegment: 'Government', SalesChannel: 'Online', UnitsSold: 325, Cost: 57078, TransactionCount: 311 },
  { Date: '2023-02-01', Revenue: 14725, Expenses: 8264, Profit: 6461, ProfitMargin: 43.9, Category: 'Software', Region: 'Europe', Country: 'Lithuania', CustomerSegment: 'Consumer', SalesChannel: 'Online', UnitsSold: 66, Cost: 8264, TransactionCount: 68 },
  { Date: '2024-02-01', Revenue: 17200, Expenses: 13439, Profit: 3761, ProfitMargin: 21.9, Category: 'Hardware', Region: 'Europe', Country: 'Lithuania', CustomerSegment: 'SMB', SalesChannel: 'Online', UnitsSold: 86, Cost: 13439, TransactionCount: 85 },
  { Date: '2024-05-16', Revenue: 75595, Expenses: 39342, Profit: 36253, ProfitMargin: 48.0, Category: 'Software', Region: 'Middle East', Country: 'Oman', CustomerSegment: 'Government', SalesChannel: 'Direct Sales', UnitsSold: 419, Cost: 39342, TransactionCount: 340 },
  { Date: '2026-02-01', Revenue: 66845, Expenses: 37757, Profit: 29088, ProfitMargin: 43.5, Category: 'Cloud', Region: 'Middle East', Country: 'Oman', CustomerSegment: 'Government', SalesChannel: 'Direct Sales', UnitsSold: 253, Cost: 37757, TransactionCount: 249 },
  { Date: '2023-11-01', Revenue: 15007, Expenses: 7838, Profit: 7169, ProfitMargin: 47.8, Category: 'Software', Region: 'Africa', Country: 'Namibia', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 60, Cost: 7838, TransactionCount: 56 },
  { Date: '2026-08-01', Revenue: 31800, Expenses: 18414, Profit: 13386, ProfitMargin: 42.1, Category: 'Cloud', Region: 'Africa', Country: 'Namibia', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 102, Cost: 18414, TransactionCount: 83 },
  { Date: '2023-04-16', Revenue: 135596, Expenses: 69582, Profit: 66014, ProfitMargin: 48.7, Category: 'Cloud', Region: 'Europe', Country: 'Sweden', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 391, Cost: 69582, TransactionCount: 361 },
  { Date: '2025-08-01', Revenue: 197630, Expenses: 119140, Profit: 78490, ProfitMargin: 39.7, Category: 'Cloud', Region: 'Europe', Country: 'Sweden', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 569, Cost: 119140, TransactionCount: 608 },
  { Date: '2023-04-16', Revenue: 153859, Expenses: 107278, Profit: 46581, ProfitMargin: 30.3, Category: 'Hardware', Region: 'Middle East', Country: 'Israel', CustomerSegment: 'SMB', SalesChannel: 'Retail', UnitsSold: 511, Cost: 107278, TransactionCount: 553 },
  { Date: '2026-08-01', Revenue: 330607, Expenses: 196013, Profit: 134594, ProfitMargin: 40.7, Category: 'Cloud', Region: 'Middle East', Country: 'Israel', CustomerSegment: 'SMB', SalesChannel: 'Online', UnitsSold: 1448, Cost: 196013, TransactionCount: 1588 },
  { Date: '2023-02-01', Revenue: 14709, Expenses: 9659, Profit: 5050, ProfitMargin: 34.3, Category: 'Services', Region: 'Africa', Country: 'Dem. Rep. Congo', CustomerSegment: 'Consumer', SalesChannel: 'Direct Sales', UnitsSold: 73, Cost: 9659, TransactionCount: 60 },
  { Date: '2026-04-01', Revenue: 26452, Expenses: 14606, Profit: 11846, ProfitMargin: 44.8, Category: 'Software', Region: 'Africa', Country: 'Dem. Rep. Congo', CustomerSegment: 'Government', SalesChannel: 'Online', UnitsSold: 109, Cost: 14606, TransactionCount: 91 },
  { Date: '2024-06-16', Revenue: 21239, Expenses: 15002, Profit: 6237, ProfitMargin: 29.4, Category: 'Hardware', Region: 'North America', Country: 'Haiti', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 95, Cost: 15002, TransactionCount: 91 },
  { Date: '2023-04-01', Revenue: 15706, Expenses: 8491, Profit: 7215, ProfitMargin: 45.9, Category: 'Software', Region: 'North America', Country: 'Haiti', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 54, Cost: 8491, TransactionCount: 54 },
  { Date: '2024-09-01', Revenue: 37160, Expenses: 19920, Profit: 17240, ProfitMargin: 46.4, Category: 'Software', Region: 'Asia Pacific', Country: 'Turkmenistan', CustomerSegment: 'Government', SalesChannel: 'Online', UnitsSold: 146, Cost: 19920, TransactionCount: 142 },
  { Date: '2025-02-16', Revenue: 35789, Expenses: 20845, Profit: 14944, ProfitMargin: 41.8, Category: 'Services', Region: 'Asia Pacific', Country: 'Turkmenistan', CustomerSegment: 'Government', SalesChannel: 'Partner', UnitsSold: 110, Cost: 20845, TransactionCount: 110 },
  { Date: '2026-03-16', Revenue: 65744, Expenses: 38166, Profit: 27578, ProfitMargin: 41.9, Category: 'Cloud', Region: 'Africa', Country: 'Angola', CustomerSegment: 'Government', SalesChannel: 'Direct Sales', UnitsSold: 294, Cost: 38166, TransactionCount: 290 },
  { Date: '2023-07-16', Revenue: 54091, Expenses: 31764, Profit: 22327, ProfitMargin: 41.3, Category: 'Services', Region: 'Africa', Country: 'Angola', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 181, Cost: 31764, TransactionCount: 182 },
  { Date: '2023-07-16', Revenue: 19147, Expenses: 10593, Profit: 8554, ProfitMargin: 44.7, Category: 'Software', Region: 'Europe', Country: 'Croatia', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 73, Cost: 10593, TransactionCount: 64 },
  { Date: '2025-01-16', Revenue: 15293, Expenses: 8517, Profit: 6776, ProfitMargin: 44.3, Category: 'Software', Region: 'Europe', Country: 'Croatia', CustomerSegment: 'SMB', SalesChannel: 'Partner', UnitsSold: 69, Cost: 8517, TransactionCount: 69 },
  { Date: '2023-03-01', Revenue: 172956, Expenses: 85884, Profit: 87072, ProfitMargin: 50.3, Category: 'Software', Region: 'Latin America', Country: 'Argentina', CustomerSegment: 'SMB', SalesChannel: 'Online', UnitsSold: 765, Cost: 85884, TransactionCount: 698 },
  { Date: '2025-12-01', Revenue: 230613, Expenses: 111563, Profit: 119050, ProfitMargin: 51.6, Category: 'Software', Region: 'Latin America', Country: 'Argentina', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 1252, Cost: 111563, TransactionCount: 1104 },
  { Date: '2024-02-16', Revenue: 213845, Expenses: 148023, Profit: 65822, ProfitMargin: 30.8, Category: 'Hardware', Region: 'Europe', Country: 'Turkey', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 1025, Cost: 148023, TransactionCount: 856 },
  { Date: '2023-09-16', Revenue: 204628, Expenses: 116354, Profit: 88274, ProfitMargin: 43.1, Category: 'Software', Region: 'Europe', Country: 'Turkey', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 643, Cost: 116354, TransactionCount: 671 },
  { Date: '2023-08-16', Revenue: 158099, Expenses: 85929, Profit: 72170, ProfitMargin: 45.6, Category: 'Software', Region: 'Europe', Country: 'Switzerland', CustomerSegment: 'Consumer', SalesChannel: 'Direct Sales', UnitsSold: 639, Cost: 85929, TransactionCount: 580 },
  { Date: '2025-05-01', Revenue: 215002, Expenses: 146131, Profit: 68871, ProfitMargin: 32.0, Category: 'Hardware', Region: 'Europe', Country: 'Switzerland', CustomerSegment: 'SMB', SalesChannel: 'Online', UnitsSold: 696, Cost: 146131, TransactionCount: 721 },
  { Date: '2025-01-16', Revenue: 124493, Expenses: 66180, Profit: 58313, ProfitMargin: 46.8, Category: 'Cloud', Region: 'Europe', Country: 'Austria', CustomerSegment: 'Consumer', SalesChannel: 'Retail', UnitsSold: 477, Cost: 66180, TransactionCount: 448 },
  { Date: '2023-11-16', Revenue: 91397, Expenses: 50801, Profit: 40596, ProfitMargin: 44.4, Category: 'Software', Region: 'Europe', Country: 'Austria', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 490, Cost: 50801, TransactionCount: 479 },
  { Date: '2023-09-01', Revenue: 15199, Expenses: 8253, Profit: 6946, ProfitMargin: 45.7, Category: 'Cloud', Region: 'Africa', Country: 'Botswana', CustomerSegment: 'Government', SalesChannel: 'Online', UnitsSold: 52, Cost: 8253, TransactionCount: 47 },
  { Date: '2024-08-01', Revenue: 21300, Expenses: 12277, Profit: 9023, ProfitMargin: 42.4, Category: 'Software', Region: 'Africa', Country: 'Botswana', CustomerSegment: 'Enterprise', SalesChannel: 'Retail', UnitsSold: 71, Cost: 12277, TransactionCount: 71 },
  { Date: '2025-06-16', Revenue: 47191, Expenses: 33145, Profit: 14046, ProfitMargin: 29.8, Category: 'Hardware', Region: 'Africa', Country: 'Ivory Coast', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 255, Cost: 33145, TransactionCount: 214 },
  { Date: '2023-05-16', Revenue: 31838, Expenses: 19058, Profit: 12780, ProfitMargin: 40.1, Category: 'Cloud', Region: 'Africa', Country: 'Ivory Coast', CustomerSegment: 'Government', SalesChannel: 'Direct Sales', UnitsSold: 164, Cost: 19058, TransactionCount: 143 },
  { Date: '2023-09-01', Revenue: 15268, Expenses: 11443, Profit: 3825, ProfitMargin: 25.0, Category: 'Hardware', Region: 'Europe', Country: 'Kosovo', CustomerSegment: 'Consumer', SalesChannel: 'Direct Sales', UnitsSold: 67, Cost: 11443, TransactionCount: 60 },
  { Date: '2023-05-16', Revenue: 15322, Expenses: 8097, Profit: 7225, ProfitMargin: 47.2, Category: 'Software', Region: 'Europe', Country: 'Kosovo', CustomerSegment: 'SMB', SalesChannel: 'Retail', UnitsSold: 48, Cost: 8097, TransactionCount: 46 },
  { Date: '2025-04-16', Revenue: 19113, Expenses: 12054, Profit: 7059, ProfitMargin: 36.9, Category: 'Services', Region: 'North America', Country: 'Barbados', CustomerSegment: 'Enterprise', SalesChannel: 'Partner', UnitsSold: 60, Cost: 12054, TransactionCount: 56 },
  { Date: '2023-06-16', Revenue: 16108, Expenses: 9460, Profit: 6648, ProfitMargin: 41.3, Category: 'Cloud', Region: 'North America', Country: 'Barbados', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 77, Cost: 9460, TransactionCount: 82 },
  { Date: '2025-11-01', Revenue: 21612, Expenses: 11497, Profit: 10115, ProfitMargin: 46.8, Category: 'Cloud', Region: 'Africa', Country: 'Comoros', CustomerSegment: 'SMB', SalesChannel: 'Online', UnitsSold: 79, Cost: 11497, TransactionCount: 67 },
  { Date: '2025-02-16', Revenue: 22389, Expenses: 12900, Profit: 9489, ProfitMargin: 42.4, Category: 'Consulting', Region: 'Africa', Country: 'Comoros', CustomerSegment: 'Government', SalesChannel: 'Direct Sales', UnitsSold: 115, Cost: 12900, TransactionCount: 109 },
  { Date: '2025-10-16', Revenue: 20823, Expenses: 10518, Profit: 10305, ProfitMargin: 49.5, Category: 'Software', Region: 'North America', Country: 'El Salvador', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 94, Cost: 10518, TransactionCount: 96 },
  { Date: '2025-11-01', Revenue: 23753, Expenses: 18302, Profit: 5451, ProfitMargin: 22.9, Category: 'Hardware', Region: 'North America', Country: 'El Salvador', CustomerSegment: 'Consumer', SalesChannel: 'Direct Sales', UnitsSold: 68, Cost: 18302, TransactionCount: 62 },
  { Date: '2025-10-16', Revenue: 21232, Expenses: 11911, Profit: 9321, ProfitMargin: 43.9, Category: 'Software', Region: 'Middle East', Country: 'Lebanon', CustomerSegment: 'Consumer', SalesChannel: 'Online', UnitsSold: 68, Cost: 11911, TransactionCount: 61 },
  { Date: '2023-11-16', Revenue: 14158, Expenses: 8853, Profit: 5305, ProfitMargin: 37.5, Category: 'Services', Region: 'Middle East', Country: 'Lebanon', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 45, Cost: 8853, TransactionCount: 45 },
  { Date: '2025-04-01', Revenue: 21501, Expenses: 9904, Profit: 11597, ProfitMargin: 53.9, Category: 'Software', Region: 'Africa', Country: 'Mauritania', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 97, Cost: 9904, TransactionCount: 101 },
  { Date: '2023-11-01', Revenue: 12668, Expenses: 7093, Profit: 5575, ProfitMargin: 44.0, Category: 'Consulting', Region: 'Africa', Country: 'Mauritania', CustomerSegment: 'SMB', SalesChannel: 'Partner', UnitsSold: 39, Cost: 7093, TransactionCount: 36 },
  { Date: '2023-09-16', Revenue: 63651, Expenses: 35880, Profit: 27771, ProfitMargin: 43.6, Category: 'Software', Region: 'Europe', Country: 'Greece', CustomerSegment: 'Consumer', SalesChannel: 'Retail', UnitsSold: 207, Cost: 35880, TransactionCount: 203 },
  { Date: '2025-12-01', Revenue: 92474, Expenses: 61744, Profit: 30730, ProfitMargin: 33.2, Category: 'Services', Region: 'Europe', Country: 'Greece', CustomerSegment: 'Consumer', SalesChannel: 'Partner', UnitsSold: 365, Cost: 61744, TransactionCount: 373 },
  { Date: '2024-10-01', Revenue: 18213, Expenses: 9386, Profit: 8827, ProfitMargin: 48.5, Category: 'Software', Region: 'Africa', Country: 'Republic of the Congo', CustomerSegment: 'Enterprise', SalesChannel: 'Partner', UnitsSold: 58, Cost: 9386, TransactionCount: 55 },
  { Date: '2026-06-16', Revenue: 27142, Expenses: 18540, Profit: 8602, ProfitMargin: 31.7, Category: 'Hardware', Region: 'Africa', Country: 'Republic of the Congo', CustomerSegment: 'Consumer', SalesChannel: 'Partner', UnitsSold: 86, Cost: 18540, TransactionCount: 86 },
  { Date: '2026-05-01', Revenue: 113880, Expenses: 64134, Profit: 49746, ProfitMargin: 43.7, Category: 'Services', Region: 'Europe', Country: 'Finland', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 341, Cost: 64134, TransactionCount: 321 },
  { Date: '2023-10-16', Revenue: 70256, Expenses: 38206, Profit: 32050, ProfitMargin: 45.6, Category: 'Consulting', Region: 'Europe', Country: 'Finland', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 231, Cost: 38206, TransactionCount: 239 },
  { Date: '2024-03-01', Revenue: 16974, Expenses: 8953, Profit: 8021, ProfitMargin: 47.3, Category: 'Software', Region: 'Europe', Country: 'Estonia', CustomerSegment: 'SMB', SalesChannel: 'Retail', UnitsSold: 55, Cost: 8953, TransactionCount: 48 },
  { Date: '2025-12-01', Revenue: 20264, Expenses: 10845, Profit: 9419, ProfitMargin: 46.5, Category: 'Cloud', Region: 'Europe', Country: 'Estonia', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 86, Cost: 10845, TransactionCount: 84 },
  { Date: '2025-03-16', Revenue: 21780, Expenses: 13908, Profit: 7872, ProfitMargin: 36.1, Category: 'Services', Region: 'Africa', Country: 'Burundi', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 115, Cost: 13908, TransactionCount: 95 },
  { Date: '2024-08-01', Revenue: 22988, Expenses: 18212, Profit: 4776, ProfitMargin: 20.8, Category: 'Hardware', Region: 'Africa', Country: 'Burundi', CustomerSegment: 'Enterprise', SalesChannel: 'Partner', UnitsSold: 98, Cost: 18212, TransactionCount: 85 },
  { Date: '2025-04-16', Revenue: 477233, Expenses: 267481, Profit: 209752, ProfitMargin: 44.0, Category: 'Services', Region: 'North America', Country: 'Mexico', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 1840, Cost: 267481, TransactionCount: 1957 },
  { Date: '2026-06-16', Revenue: 562261, Expenses: 276782, Profit: 285479, ProfitMargin: 50.8, Category: 'Software', Region: 'North America', Country: 'Mexico', CustomerSegment: 'Consumer', SalesChannel: 'Direct Sales', UnitsSold: 1937, Cost: 276782, TransactionCount: 1967 },
  { Date: '2023-02-16', Revenue: 16108, Expenses: 10233, Profit: 5875, ProfitMargin: 36.5, Category: 'Services', Region: 'North America', Country: 'Guatemala', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 57, Cost: 10233, TransactionCount: 49 },
  { Date: '2023-04-16', Revenue: 20508, Expenses: 13324, Profit: 7184, ProfitMargin: 35.0, Category: 'Services', Region: 'North America', Country: 'Guatemala', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 65, Cost: 13324, TransactionCount: 58 },
  { Date: '2023-02-16', Revenue: 14651, Expenses: 8391, Profit: 6260, ProfitMargin: 42.7, Category: 'Software', Region: 'Africa', Country: 'Mali', CustomerSegment: 'Government', SalesChannel: 'Direct Sales', UnitsSold: 50, Cost: 8391, TransactionCount: 46 },
  { Date: '2023-03-16', Revenue: 17170, Expenses: 12654, Profit: 4516, ProfitMargin: 26.3, Category: 'Hardware', Region: 'Africa', Country: 'Mali', CustomerSegment: 'SMB', SalesChannel: 'Direct Sales', UnitsSold: 54, Cost: 12654, TransactionCount: 49 },
  { Date: '2023-07-01', Revenue: 20573, Expenses: 12032, Profit: 8541, ProfitMargin: 41.5, Category: 'Services', Region: 'Asia Pacific', Country: 'Cambodia', CustomerSegment: 'Enterprise', SalesChannel: 'Retail', UnitsSold: 97, Cost: 12032, TransactionCount: 105 },
  { Date: '2023-03-01', Revenue: 16141, Expenses: 7653, Profit: 8488, ProfitMargin: 52.6, Category: 'Software', Region: 'Asia Pacific', Country: 'Cambodia', CustomerSegment: 'Enterprise', SalesChannel: 'Partner', UnitsSold: 54, Cost: 7653, TransactionCount: 54 },
  { Date: '2025-04-01', Revenue: 20365, Expenses: 11769, Profit: 8596, ProfitMargin: 42.2, Category: 'Consulting', Region: 'Europe', Country: 'Montenegro', CustomerSegment: 'SMB', SalesChannel: 'Online', UnitsSold: 88, Cost: 11769, TransactionCount: 96 },
  { Date: '2025-03-16', Revenue: 19687, Expenses: 12536, Profit: 7151, ProfitMargin: 36.3, Category: 'Services', Region: 'Europe', Country: 'Montenegro', CustomerSegment: 'Government', SalesChannel: 'Partner', UnitsSold: 65, Cost: 12536, TransactionCount: 60 },
  { Date: '2026-08-01', Revenue: 21426, Expenses: 10930, Profit: 10496, ProfitMargin: 49.0, Category: 'Cloud', Region: 'Asia Pacific', Country: 'Papua New Guinea', CustomerSegment: 'Enterprise', SalesChannel: 'Partner', UnitsSold: 84, Cost: 10930, TransactionCount: 91 },
  { Date: '2025-09-01', Revenue: 17636, Expenses: 9072, Profit: 8564, ProfitMargin: 48.6, Category: 'Software', Region: 'Asia Pacific', Country: 'Papua New Guinea', CustomerSegment: 'Enterprise', SalesChannel: 'Partner', UnitsSold: 62, Cost: 9072, TransactionCount: 61 },
  { Date: '2025-10-01', Revenue: 544336, Expenses: 282270, Profit: 262066, ProfitMargin: 48.1, Category: 'Cloud', Region: 'Europe', Country: 'Italy', CustomerSegment: 'SMB', SalesChannel: 'Online', UnitsSold: 3007, Cost: 282270, TransactionCount: 2787 },
  { Date: '2025-04-16', Revenue: 575974, Expenses: 299232, Profit: 276742, ProfitMargin: 48.0, Category: 'Cloud', Region: 'Europe', Country: 'Italy', CustomerSegment: 'SMB', SalesChannel: 'Partner', UnitsSold: 2109, Cost: 299232, TransactionCount: 1773 },
  { Date: '2023-09-01', Revenue: 17591, Expenses: 11703, Profit: 5888, ProfitMargin: 33.5, Category: 'Hardware', Region: 'Africa', Country: 'Zimbabwe', CustomerSegment: 'Consumer', SalesChannel: 'Online', UnitsSold: 70, Cost: 11703, TransactionCount: 57 },
  { Date: '2024-01-01', Revenue: 15525, Expenses: 12397, Profit: 3128, ProfitMargin: 20.1, Category: 'Hardware', Region: 'Africa', Country: 'Zimbabwe', CustomerSegment: 'Consumer', SalesChannel: 'Direct Sales', UnitsSold: 79, Cost: 12397, TransactionCount: 85 },
  { Date: '2025-05-01', Revenue: 40732, Expenses: 27843, Profit: 12889, ProfitMargin: 31.6, Category: 'Hardware', Region: 'Middle East', Country: 'Jordan', CustomerSegment: 'Enterprise', SalesChannel: 'Retail', UnitsSold: 174, Cost: 27843, TransactionCount: 163 },
  { Date: '2025-08-16', Revenue: 48514, Expenses: 25437, Profit: 23077, ProfitMargin: 47.6, Category: 'Software', Region: 'Middle East', Country: 'Jordan', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 229, Cost: 25437, TransactionCount: 237 },
  { Date: '2024-10-16', Revenue: 36330, Expenses: 20406, Profit: 15924, ProfitMargin: 43.8, Category: 'Services', Region: 'Africa', Country: 'Ethiopia', CustomerSegment: 'SMB', SalesChannel: 'Online', UnitsSold: 177, Cost: 20406, TransactionCount: 190 },
  { Date: '2024-02-01', Revenue: 33345, Expenses: 21899, Profit: 11446, ProfitMargin: 34.3, Category: 'Hardware', Region: 'Africa', Country: 'Ethiopia', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 96, Cost: 21899, TransactionCount: 78 },
  { Date: '2026-01-01', Revenue: 22026, Expenses: 11385, Profit: 10641, ProfitMargin: 48.3, Category: 'Software', Region: 'Africa', Country: 'Gabon', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 120, Cost: 11385, TransactionCount: 119 },
  { Date: '2023-10-16', Revenue: 17858, Expenses: 9540, Profit: 8318, ProfitMargin: 46.6, Category: 'Software', Region: 'Africa', Country: 'Gabon', CustomerSegment: 'Consumer', SalesChannel: 'Direct Sales', UnitsSold: 59, Cost: 9540, TransactionCount: 58 },
  { Date: '2024-02-16', Revenue: 17660, Expenses: 8217, Profit: 9443, ProfitMargin: 53.5, Category: 'Software', Region: 'Africa', Country: 'Liberia', CustomerSegment: 'Enterprise', SalesChannel: 'Partner', UnitsSold: 83, Cost: 8217, TransactionCount: 89 },
  { Date: '2025-02-16', Revenue: 18295, Expenses: 10123, Profit: 8172, ProfitMargin: 44.7, Category: 'Software', Region: 'Africa', Country: 'Liberia', CustomerSegment: 'SMB', SalesChannel: 'Online', UnitsSold: 62, Cost: 10123, TransactionCount: 68 },
  { Date: '2025-05-16', Revenue: 50570, Expenses: 28801, Profit: 21769, ProfitMargin: 43.0, Category: 'Consulting', Region: 'Latin America', Country: 'Uruguay', CustomerSegment: 'Consumer', SalesChannel: 'Direct Sales', UnitsSold: 148, Cost: 28801, TransactionCount: 148 },
  { Date: '2026-07-01', Revenue: 54229, Expenses: 31336, Profit: 22893, ProfitMargin: 42.2, Category: 'Services', Region: 'Latin America', Country: 'Uruguay', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 289, Cost: 31336, TransactionCount: 281 },
  { Date: '2025-09-16', Revenue: 18155, Expenses: 9085, Profit: 9070, ProfitMargin: 50.0, Category: 'Software', Region: 'Africa', Country: 'Senegal', CustomerSegment: 'Enterprise', SalesChannel: 'Partner', UnitsSold: 64, Cost: 9085, TransactionCount: 54 },
  { Date: '2026-01-01', Revenue: 16998, Expenses: 8605, Profit: 8393, ProfitMargin: 49.4, Category: 'Software', Region: 'Africa', Country: 'Senegal', CustomerSegment: 'Enterprise', SalesChannel: 'Direct Sales', UnitsSold: 63, Cost: 8605, TransactionCount: 53 },
  { Date: '2023-05-01', Revenue: 21684, Expenses: 11366, Profit: 10318, ProfitMargin: 47.6, Category: 'Software', Region: 'Africa', Country: 'Central African Rep.', CustomerSegment: 'Enterprise', SalesChannel: 'Retail', UnitsSold: 105, Cost: 11366, TransactionCount: 110 },
  { Date: '2026-01-16', Revenue: 20798, Expenses: 10549, Profit: 10249, ProfitMargin: 49.3, Category: 'Software', Region: 'Africa', Country: 'Central African Rep.', CustomerSegment: 'Consumer', SalesChannel: 'Partner', UnitsSold: 99, Cost: 10549, TransactionCount: 88 },
  { Date: '2023-08-01', Revenue: 340809, Expenses: 206521, Profit: 134288, ProfitMargin: 39.4, Category: 'Services', Region: 'Europe', Country: 'Russia', CustomerSegment: 'Consumer', SalesChannel: 'Direct Sales', UnitsSold: 1242, Cost: 206521, TransactionCount: 1331 },
  { Date: '2024-03-16', Revenue: 388525, Expenses: 244156, Profit: 144369, ProfitMargin: 37.2, Category: 'Consulting', Region: 'Europe', Country: 'Russia', CustomerSegment: 'Enterprise', SalesChannel: 'Online', UnitsSold: 1129, Cost: 244156, TransactionCount: 1078 },
];

export const getEmbeddedDemoData = () => {
  return processData(EMBEDDED_DEMO_DATASET);
};

const normalizeHeader = (header) => {
  return String(header || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');
};

const parseNumericValue = (val) => {
  if (val === null || val === undefined || val === '') return 0;
  if (typeof val === 'number') return isNaN(val) ? 0 : val;
  const cleaned = String(val).replace(/[\$,%\s]/g, '').trim();
  const num = parseFloat(cleaned);
  return isFinite(num) ? num : 0;
};

const parseDateValue = (val) => {
  if (!val) return null;

  if (typeof val === 'number') {
    const excelEpoch = new Date(1899, 11, 30);
    const date = new Date(excelEpoch.getTime() + val * 86400000);
    return isNaN(date.getTime()) ? null : date.toISOString().split('T')[0];
  }

  const str = String(val).trim();
  const d = new Date(str);
  if (!isNaN(d.getTime())) {
    return d.toISOString().split('T')[0];
  }

  const parts = str.split(/[-/]/);
  if (parts.length === 3) {
    let year = parseInt(parts[2], 10);
    let month = parseInt(parts[0], 10) - 1;
    let day = parseInt(parts[1], 10);
    if (year < 100) year += 2000;
    const fallbackDate = new Date(year, month, day);
    if (!isNaN(fallbackDate.getTime())) {
      return fallbackDate.toISOString().split('T')[0];
    }
  }

  return null;
};

const normalizeRow = (rawRow) => {
  const normalized = {};

  Object.keys(rawRow).forEach((key) => {
    const normKey = normalizeHeader(key);
    const value = rawRow[key];

    if (/^(date|period|time|timestamp|month|year|day|txdate)$/.test(normKey)) {
      normalized.Date = parseDateValue(value);
    } else if (/^(revenue|sales|totalrevenue|turnover|income|amount)$/.test(normKey)) {
      normalized.Revenue = parseNumericValue(value);
    } else if (/^(expenses|expense|cost|costs|totalexpenses|expenditure|opex)$/.test(normKey)) {
      normalized.Expenses = parseNumericValue(value);
    } else if (/^(profit|netprofit|netincome|earnings|marginamount)$/.test(normKey)) {
      normalized.Profit = parseNumericValue(value);
    } else if (/^(profitmargin|margin|marginpct|profitmarginpct)$/.test(normKey)) {
      normalized.ProfitMargin = parseNumericValue(value);
    } else if (/^(category|productcategory|product|service|type|item)$/.test(normKey)) {
      normalized.Category = String(value || 'General').trim();
    } else if (/^(region|geography|territory|location|area)$/.test(normKey)) {
      normalized.Region = String(value || 'Global').trim();
    } else if (/^(country|countryname|nation|worldcountry)$/.test(normKey)) {
      normalized.Country = String(value || 'United States').trim();
    } else if (/^(customersegment|segment|clienttype|customer|targetgroup)$/.test(normKey)) {
      normalized.CustomerSegment = String(value || 'All Segments').trim();
    } else if (/^(saleschannel|channel|source|medium|distributor)$/.test(normKey)) {
      normalized.SalesChannel = String(value || 'Direct').trim();
    } else if (/^(unitssold|units|quantity|qty|volume)$/.test(normKey)) {
      normalized.UnitsSold = parseNumericValue(value);
    } else if (/^(unitcost|cogs|directcost)$/.test(normKey)) {
      normalized.Cost = parseNumericValue(value);
    } else if (/^(transactioncount|transactions|orders|visits|activeusers|count)$/.test(normKey)) {
      normalized.TransactionCount = parseNumericValue(value);
    }
  });

  if (normalized.Revenue !== undefined && normalized.Expenses !== undefined && normalized.Profit === undefined) {
    normalized.Profit = normalized.Revenue - normalized.Expenses;
  } else if (normalized.Revenue !== undefined && normalized.Profit !== undefined && normalized.Expenses === undefined) {
    normalized.Expenses = normalized.Revenue - normalized.Profit;
  }

  if (normalized.Revenue && normalized.Profit !== undefined && (normalized.ProfitMargin === undefined || normalized.ProfitMargin === 0)) {
    normalized.ProfitMargin = (normalized.Profit / normalized.Revenue) * 100;
  }

  normalized.Revenue = normalized.Revenue || 0;
  normalized.Expenses = normalized.Expenses || 0;
  normalized.Profit = normalized.Profit || 0;
  normalized.ProfitMargin = normalized.Revenue > 0 ? (normalized.Profit / normalized.Revenue) * 100 : 0;
  normalized.Category = normalized.Category || 'General';
  normalized.Region = normalized.Region || 'Global';
  
  // Intelligent country fallback based on region
  if (!normalized.Country) {
    if (normalized.Region === 'North America') normalized.Country = 'United States';
    else if (normalized.Region === 'Europe') normalized.Country = 'Germany';
    else if (normalized.Region === 'Asia Pacific') normalized.Country = 'China';
    else if (normalized.Region === 'Middle East') normalized.Country = 'Saudi Arabia';
    else if (normalized.Region === 'Latin America') normalized.Country = 'Brazil';
    else normalized.Country = 'United States';
  }

  normalized.CustomerSegment = normalized.CustomerSegment || 'All Segments';
  normalized.SalesChannel = normalized.SalesChannel || 'Direct';
  normalized.UnitsSold = normalized.UnitsSold || 0;
  normalized.TransactionCount = normalized.TransactionCount || (normalized.UnitsSold || 1);

  return normalized;
};

export const fetchSampleData = async () => {
  try {
    const response = await fetch('/data/sample_financials.csv');
    if (response.ok) {
      const csvText = await response.text();
      if (csvText && !csvText.trim().startsWith('<') && csvText.includes(',')) {
        const parsed = await parseCSVText(csvText);
        if (parsed && parsed.rawRecords && parsed.rawRecords.length > 0) {
          return parsed;
        }
      }
    }
  } catch (error) {
    console.warn('Network fetch for CSV failed, seamlessly loading embedded demo dataset:', error);
  }
  return processData(EMBEDDED_DEMO_DATASET);
};

const parseCSVText = (csvText) => {
  return new Promise((resolve) => {
    Papa.parse(csvText, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: 'greedy',
      complete: (results) => {
        if (!results.data || results.data.length === 0) {
          resolve(processData(EMBEDDED_DEMO_DATASET));
          return;
        }
        const normalized = results.data.map(normalizeRow).filter(r => r.Date);
        if (normalized.length === 0) {
          resolve(processData(EMBEDDED_DEMO_DATASET));
          return;
        }
        resolve(processData(normalized));
      },
      error: () => {
        resolve(processData(EMBEDDED_DEMO_DATASET));
      }
    });
  });
};

export const parseUploadedFile = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error('No file selected.'));
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      reject(new Error('File size exceeds 10MB limit.'));
      return;
    }

    const fileName = file.name.toLowerCase();

    if (fileName.endsWith('.csv')) {
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: 'greedy',
        complete: (results) => {
          if (!results.data || results.data.length === 0) {
            reject(new Error('Uploaded CSV file is empty.'));
            return;
          }
          const normalized = results.data.map(normalizeRow).filter(r => r.Date);
          if (normalized.length === 0) {
            reject(new Error('No valid date/financial records found in CSV. Please verify column headers.'));
            return;
          }
          resolve(processData(normalized));
        },
        error: (error) => reject(error)
      });
    } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });

          if (!jsonData || jsonData.length === 0) {
            reject(new Error('Uploaded Excel file contains no readable rows.'));
            return;
          }

          const normalized = jsonData.map(normalizeRow).filter(r => r.Date);
          if (normalized.length === 0) {
            reject(new Error('No valid financial records found in Excel sheet.'));
            return;
          }

          resolve(processData(normalized));
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = (err) => reject(err);
      reader.readAsArrayBuffer(file);
    } else {
      reject(new Error('Unsupported file format. Please upload a .csv or .xlsx file.'));
    }
  });
};

export const processData = (rawData) => {
  if (!rawData || rawData.length === 0) return null;

  const validData = rawData.filter(item => item.Date && !isNaN(new Date(item.Date).getTime()));
  const sortedData = [...validData].sort((a, b) => new Date(a.Date) - new Date(b.Date));

  if (sortedData.length === 0) return null;

  const totalRevenue = sortedData.reduce((sum, d) => sum + d.Revenue, 0);
  const totalExpenses = sortedData.reduce((sum, d) => sum + d.Expenses, 0);
  const totalProfit = sortedData.reduce((sum, d) => sum + d.Profit, 0);
  const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;
  const totalTransactions = sortedData.reduce((sum, d) => sum + (d.TransactionCount || 1), 0);
  const avgRevenue = totalTransactions > 0 ? totalRevenue / totalTransactions : totalRevenue / sortedData.length;

  let revenueGrowth = 0;
  let expenseGrowth = 0;
  let profitGrowth = 0;

  if (sortedData.length >= 2) {
    const midPoint = Math.floor(sortedData.length / 2);
    const firstHalf = sortedData.slice(0, midPoint);
    const secondHalf = sortedData.slice(midPoint);

    const rev1 = firstHalf.reduce((sum, d) => sum + d.Revenue, 0);
    const rev2 = secondHalf.reduce((sum, d) => sum + d.Revenue, 0);
    revenueGrowth = rev1 > 0 ? ((rev2 - rev1) / rev1) * 100 : 0;

    const exp1 = firstHalf.reduce((sum, d) => sum + d.Expenses, 0);
    const exp2 = secondHalf.reduce((sum, d) => sum + d.Expenses, 0);
    expenseGrowth = exp1 > 0 ? ((exp2 - exp1) / exp1) * 100 : 0;

    const prof1 = firstHalf.reduce((sum, d) => sum + d.Profit, 0);
    const prof2 = secondHalf.reduce((sum, d) => sum + d.Profit, 0);
    profitGrowth = prof1 > 0 ? ((prof2 - prof1) / prof1) * 100 : 0;
  }

  const categories = Array.from(new Set(sortedData.map(d => d.Category).filter(Boolean))).sort();
  const regions = Array.from(new Set(sortedData.map(d => d.Region).filter(Boolean))).sort();
  const countries = Array.from(new Set(sortedData.map(d => d.Country).filter(Boolean))).sort();
  const segments = Array.from(new Set(sortedData.map(d => d.CustomerSegment).filter(Boolean))).sort();
  const channels = Array.from(new Set(sortedData.map(d => d.SalesChannel).filter(Boolean))).sort();

  const timeMap = {};
  sortedData.forEach(item => {
    const dateKey = item.Date;
    if (!timeMap[dateKey]) {
      timeMap[dateKey] = {
        Date: dateKey,
        Revenue: 0,
        Expenses: 0,
        Profit: 0,
        UnitsSold: 0,
        TransactionCount: 0
      };
    }
    timeMap[dateKey].Revenue += item.Revenue;
    timeMap[dateKey].Expenses += item.Expenses;
    timeMap[dateKey].Profit += item.Profit;
    timeMap[dateKey].UnitsSold += (item.UnitsSold || 0);
    timeMap[dateKey].TransactionCount += (item.TransactionCount || 1);
  });

  const timeseries = Object.values(timeMap).map(d => ({
    ...d,
    ProfitMargin: d.Revenue > 0 ? (d.Profit / d.Revenue) * 100 : 0
  })).sort((a, b) => new Date(a.Date) - new Date(b.Date));

  const getBreakdown = (dimensionKey) => {
    const map = {};
    sortedData.forEach(item => {
      const name = item[dimensionKey] || 'Other';
      if (!map[name]) {
        map[name] = { name, value: 0, profit: 0, expenses: 0, count: 0 };
      }
      map[name].value += item.Revenue;
      map[name].profit += item.Profit;
      map[name].expenses += item.Expenses;
      map[name].count += 1;
    });
    return Object.values(map)
      .map(item => ({
        ...item,
        margin: item.value > 0 ? (item.profit / item.value) * 100 : 0,
        percentage: totalRevenue > 0 ? (item.value / totalRevenue) * 100 : 0
      }))
      .sort((a, b) => b.value - a.value);
  };

  const categoryBreakdown = getBreakdown('Category');
  const regionBreakdown = getBreakdown('Region');
  const countryBreakdown = getBreakdown('Country');
  const segmentBreakdown = getBreakdown('CustomerSegment');
  const channelBreakdown = getBreakdown('SalesChannel');

  let highestRevenuePeriod = timeseries[0];
  let lowestRevenuePeriod = timeseries[0];
  let highestProfitPeriod = timeseries[0];
  let lowestProfitPeriod = timeseries[0];

  timeseries.forEach(t => {
    if (t.Revenue > highestRevenuePeriod.Revenue) highestRevenuePeriod = t;
    if (t.Revenue < lowestRevenuePeriod.Revenue) lowestRevenuePeriod = t;
    if (t.Profit > highestProfitPeriod.Profit) highestProfitPeriod = t;
    if (t.Profit < lowestProfitPeriod.Profit) lowestProfitPeriod = t;
  });

  const topCategories = categoryBreakdown.slice(0, 5);
  const underperformingCategories = categoryBreakdown.filter(c => c.margin < 25 || c.profit < 0);
  const topRegions = regionBreakdown.slice(0, 5);

  const insights = generateInsights({
    totalRevenue,
    totalProfit,
    totalExpenses,
    profitMargin,
    revenueGrowth,
    expenseGrowth,
    highestRevenuePeriod,
    highestProfitPeriod,
    topCategories,
    topRegions,
    underperformingCategories,
    timeseriesLength: timeseries.length
  });

  return {
    rawRecords: sortedData,
    timeseries,
    kpis: {
      totalRevenue,
      totalExpenses,
      totalProfit,
      profitMargin,
      avgRevenue,
      revenueGrowth,
      expenseGrowth,
      profitGrowth,
      totalTransactions
    },
    dimensions: {
      categories,
      regions,
      countries,
      segments,
      channels
    },
    breakdowns: {
      Category: categoryBreakdown,
      Region: regionBreakdown,
      Country: countryBreakdown,
      CustomerSegment: segmentBreakdown,
      SalesChannel: channelBreakdown
    },
    deepAnalysis: {
      highestRevenuePeriod,
      lowestRevenuePeriod,
      highestProfitPeriod,
      lowestProfitPeriod,
      topCategories,
      topRegions,
      underperformingCategories
    },
    insights
  };
};

const generateInsights = ({
  totalRevenue,
  profitMargin,
  revenueGrowth,
  expenseGrowth,
  highestRevenuePeriod,
  highestProfitPeriod,
  topCategories,
  topRegions,
  underperformingCategories
}) => {
  const en = [];
  const ar = [];

  if (revenueGrowth !== 0) {
    const isPos = revenueGrowth > 0;
    en.push({
      type: isPos ? 'positive' : 'negative',
      text: `Revenue ${isPos ? 'increased' : 'decreased'} by ${Math.abs(revenueGrowth).toFixed(1)}% compared to the previous period.`
    });
    ar.push({
      type: isPos ? 'positive' : 'negative',
      text: `${isPos ? 'ط§ط±طھظپط¹طھ' : 'ط§ظ†ط®ظپط¶طھ'} ط§ظ„ط¥ظٹط±ط§ط¯ط§طھ ط¨ظ†ط³ط¨ط© ${Math.abs(revenueGrowth).toFixed(1)}% ظ…ظ‚ط§ط±ظ†ط© ط¨ط§ظ„ظپطھط±ط© ط§ظ„ط³ط§ط¨ظ‚ط©.`
    });
  }

  en.push({
    type: profitMargin >= 35 ? 'positive' : 'warning',
    text: `Overall net profit margin stands at ${profitMargin.toFixed(1)}%.`
  });
  ar.push({
    type: profitMargin >= 35 ? 'positive' : 'warning',
    text: `ظٹط¨ظ„ط؛ ظ‡ط§ظ…ط´ طµط§ظپظٹ ط§ظ„ط±ط¨ط­ ط§ظ„ط¥ط¬ظ…ط§ظ„ظٹ ${profitMargin.toFixed(1)}%.`
  });

  if (topCategories && topCategories.length > 0) {
    const top = topCategories[0];
    en.push({
      type: 'info',
      text: `${top.name} is the top revenue category generating $${top.value.toLocaleString()} (${top.percentage.toFixed(1)}% of total).`
    });
    ar.push({
      type: 'info',
      text: `طھط¹طھط¨ط± ظپط¦ط© ${top.name} ط§ظ„ط£ط¹ظ„ظ‰ ط¥ظٹط±ط§ط¯ط§ظ‹ ط¨ط¥ط¬ظ…ط§ظ„ظٹ $${top.value.toLocaleString()} (${top.percentage.toFixed(1)}% ظ…ظ† ط§ظ„ط¥ط¬ظ…ط§ظ„ظٹ).`
    });
  }

  if (topRegions && topRegions.length > 0) {
    const topR = topRegions[0];
    en.push({
      type: 'info',
      text: `${topR.name} leads regional performance with $${topR.value.toLocaleString()} in revenue.`
    });
    ar.push({
      type: 'info',
      text: `طھطھطµط¯ط± ظ…ظ†ط·ظ‚ط© ${topR.name} ط§ظ„ط£ط¯ط§ط، ط§ظ„ط¥ظ‚ظ„ظٹظ…ظٹ ط¨ط¥ظٹط±ط§ط¯ط§طھ ط¨ظ„ط؛طھ $${topR.value.toLocaleString()}.`
    });
  }

  if (highestProfitPeriod) {
    en.push({
      type: 'positive',
      text: `Peak financial performance recorded on ${highestProfitPeriod.Date} with $${highestProfitPeriod.Profit.toLocaleString()} in net profit.`
    });
    ar.push({
      type: 'positive',
      text: `طھظ… طھط³ط¬ظٹظ„ ط£ط¹ظ„ظ‰ ط£ط¯ط§ط، ظ…ط§ظ„ظٹ ظپظٹ ${highestProfitPeriod.Date} ط¨طµط§ظپظٹ ط±ط¨ط­ ظ‚ط¯ط±ظ‡ $${highestProfitPeriod.Profit.toLocaleString()}.`
    });
  }

  if (expenseGrowth > revenueGrowth && expenseGrowth > 5) {
    en.push({
      type: 'warning',
      text: `Warning: Expense growth (${expenseGrowth.toFixed(1)}%) surpassed revenue growth (${revenueGrowth.toFixed(1)}%).`
    });
    ar.push({
      type: 'warning',
      text: `طھظ†ط¨ظٹظ‡: طھط¬ط§ظˆط² ظ†ظ…ظˆ ط§ظ„ظ…طµط±ظˆظپط§طھ (${expenseGrowth.toFixed(1)}%) ظ…ط¹ط¯ظ„ ظ†ظ…ظˆ ط§ظ„ط¥ظٹط±ط§ط¯ط§طھ (${revenueGrowth.toFixed(1)}%).`
    });
  }

  if (underperformingCategories && underperformingCategories.length > 0) {
    const under = underperformingCategories[0];
    en.push({
      type: 'warning',
      text: `Underperformance flagged for ${under.name} with a profit margin of ${under.margin.toFixed(1)}%.`
    });
    ar.push({
      type: 'warning',
      text: `ظ…ظ„ط§ط­ط¸ط© ط£ط¯ط§ط، ط¶ط¹ظٹظپ ظ„ظپط¦ط© ${under.name} ط¨ظ‡ط§ظ…ط´ ط±ط¨ط­ ظٹط¨ظ„ط؛ ${under.margin.toFixed(1)}%.`
    });
  }

  return { en, ar };
};

