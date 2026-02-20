INSERT INTO twins (id,name, address) VALUES
(1,'BMW_X3', 'Justin'),
(2,'BMW_X5', 'Arlington'),
(3,'BMW_X6', 'McKinney'),
(4,'Toyota_Camry', 'Roanoke'),
(5,'Toyota_Highlander', 'Little Elm'),
(6,'Toyota_Land Cruiser', 'Fort Worth'),
(7,'Toyota_Corolla', 'Rowlett'),
(8,'Mercedes_Benz CLA', 'Garland'),
(9,'Mercedes_Benz GLA', 'Southlake'),
(10,'Lexus_IS250', 'Flower Mound');
 

INSERT INTO creators (id,name, position) VALUES
(1,'Zain RealMadrid', 'Automotive Technician'), 
(2,'Huda Juventus', 'Auto Mechanic'),
(3,'Maryam PSG', 'Master Automotive Technician'),
(4,'Maram Barcelona', 'Vehicle Maintenance Technician'),
(5,'Max Liverpool', 'Service Technician');



INSERT INTO insights (
  insight_name,
  twin_id,
  creator_id,
  projected_savings_usd,
  assignee,
  date_closed,
  last_active
) VALUES
('Replaced worn brake pads to restore safe and reliable braking.', 1, 1, 3250.00, 'Zain RealMadrid',   '2025-01-08', '2025-01-18'),
('Serviced brake rotors to eliminate vibration and improve braking performance.', 2, 2, 1480.00, 'Max Liverpool',    '2025-01-22', '2025-02-01'),

('Changed engine oil and filter to reduce wear and improve performance.', 3, 4, 5100.00, 'Huda Juventus',   '2025-02-05', '2025-02-14'),
('Replaced transmission fluid to ensure smooth shifting and extend component life.',         4, 5, 2750.00, 'Maryam PSG', '2025-02-19', '2025-03-01'),

('Installed new battery to restore reliable starting and electrical performance.',       5, 5, 6200.00, 'Maram Barcelona',  '2025-03-06', '2025-03-16'),
('Replaced alternator to maintain proper battery charging and system voltage.',           6, 1, 1900.00, 'Zain RealMadrid',   '2025-03-21', '2025-04-01'),

('Replaced starter motor to ensure consistent and reliable engine starts.',             7, 2, 980.00,  'Max Liverpool',    '2025-04-04', '2025-04-14'),
('Replaced faulty ignition coils to eliminate misfires and restore engine power.',       8, 4, 1125.00, 'Huda Juventus',   '2025-04-18', '2025-04-28'),

('Replaced worn serpentine belt to ensure proper accessory drive operation.',      9, 5, 1430.00, 'Maryam PSG', '2025-05-02', '2025-05-12'),
('Serviced timing belt to maintain engine timing and prevent severe damage.', 10,4, 8950.00, 'Maram Barcelona',  '2025-05-16', '2025-05-26'),

('Replaced fuel pump to restore proper fuel pressure and engine performance.',   1,1, 10200.00,'Zain RealMadrid',   '2025-06-03', '2025-06-13'),
('Cleaned fuel injectors to improve spray pattern and combustion efficiency.',     2,2, 2100.00, 'Max Liverpool',    '2025-06-17', '2025-06-27'),

('Replaced oxygen sensor to optimize air-fuel mixture and emissions control.',        2,4, 3650.00, 'Huda Juventus',   '2025-07-02', '2025-07-12'),
('Performed wheel alignment to improve handling and prevent uneven tire wear.',             1,5, 740.00,  'Maryam PSG', '2025-07-16', '2025-07-26'),

('Replaced worn struts to restore ride comfort and vehicle stability.',         3,1, 520.00,  'Maram Barcelona',  '2025-08-01', '2025-08-11'),
('Replaced damaged control arms to improve steering response and alignment.',             4,1, 4100.00, 'Zain RealMadrid',   '2025-08-15', '2025-08-25'),

('Replaced worn ball joints to eliminate suspension play and noise.',          5,2, 1850.00, 'Max Liverpool',    '2025-09-03', '2025-09-13'),
('Repaired exhaust leaks to reduce noise and improve emission performance.',    6,4, 2700.00, 'Huda Juventus',   '2025-09-17', '2025-09-27'),

('Replaced catalytic converter to restore emissions compliance and exhaust flow.',      7,5, 930.00,  'Maryam PSG', '2025-10-02', '2025-10-12'),
('Replaced MAF sensor to improve engine airflow measurement accuracy.',   8,2, 610.00,  'Maram Barcelona',  '2025-10-16', '2025-10-26'),

('Cleaned throttle body to restore smooth throttle response and idle stability.',      9,1, 1200.00, 'Zain RealMadrid',   '2025-11-04', '2025-11-14'),
('Replaced power steering fluid to ensure smooth and responsive steering.',10,2, 6400.00, 'Max Liverpool',    '2025-11-18', '2025-11-28'),

('Replaced damaged CV axle to eliminate vibration and drivetrain noise.',            3,4, 4300.00, 'Huda Juventus',   '2025-12-02', '2025-12-12'),
('Replaced wheel bearing to restore smooth wheel rotation and safety.',            4,5, 1550.00, 'Maryam PSG','2025-12-10', '2025-12-20'),

('Installed new tires to improve traction, handling, and driving safety.',     2,3, 2980.00, 'Maram Barcelona', '2025-12-14', '2025-12-24'),
('Replaced ABS sensor to restore proper braking and stability control.',       1,1, 3600.00, 'Zain RealMadrid',   '2025-12-18', '2025-12-28'),

('Replaced AC compressor to restore reliable cabin cooling performance.',        3,2, 890.00,  'Max Liverpool',    '2025-12-20', '2025-12-30'),
('Replaced cabin filter to improve interior air quality and airflow.',        4,4, 5200.00, 'Huda Juventus',   '2025-12-22', '2025-12-31'),

('Replaced headlight assembly to restore proper nighttime visibility and safety.',     5,5, 4100.00, 'Maryam PSG', '2025-12-26', '2025-12-31'),
('Replaced wiper motor to ensure reliable windshield clearing during rain.',     6,4, 2300.00, 'Maram Barcelona',  '2025-12-28', '2025-12-31');