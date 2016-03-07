--UPDATE add_signals SET name = 'дама бубен', file_name = '8_qw.jpg',
--text = 'Невежественная неприятная дама, устраивающая сцены и скандалы. Она любит сплетни, но при этом жуткая кокетка. Если выпадает эта карта, то можно ожидать неожиданных неприятных гостей или даже совершение кражи прямо из дома или на улице. Будьте осторожны и не доверяйте тем, кто вызывает у вас сомнения.'
--WHERE id = 195 ;
--INSERT INTO add_signals
--(id,typeid,name,file_name,rang,text) VALUES (196,9,'валет бубен','9_qw.jpg',25,
--'Если такой человек занимает высокое положение, то доверять ему всё равно не стоит: скорее всего, он достиг его при помощи лести, взяток и обмана. Редкостный мошенник и настоящий мерзавец. Такая карта свидетельствует о том, что в будущем ждёт неприятная встреча, возможно, измена или предательство хорошего друга. Будьте осмотрительны.' ) ;
-- не было файлов валюты
--UPDATE add_signals SET file_name = '1_hsvets_frank.jpg'
--WHERE id = 205 ;
--UPDATE add_signals SET file_name = '2_evro.jpg'
--WHERE id = 209 ;

--- Домино
--INSERT INTO add_signals_types(type_name,comment) VALUES ('domino','домино') ;
--INSERT INTO add_signals
--(typeid,name,file_name,rang,text) VALUES (12,'кость 3x4',
--'stock-vector-vector-domino-seven-dots-18251245.jpg',25,'' ) ;
--- Знаки стихии
--INSERT INTO add_signals_types(type_name,comment) VALUES ('elements','Знаки стихии') ;
--UPDATE add_signals SET typeid = 13 WHERE id >= 23 AND  id <= 26 ;
-- луна в последней четверти
UPDATE add_signals SET file_name = '2.jpg'
WHERE id = 15 ;