--DELETE FROM request_tree WHERE nodeid >= 93 AND  nodeid <= 93 ;
--UPDATE request_tree SET typeid = 9  WHERE nodeid = 96 ;
--UPDATE request_tree SET comment = 'синоним ORDER'  WHERE nodeid >= 39 AND  nodeid <= 39 ;
--UPDATE request_tree SET parentid = 2  WHERE nodeid >= 95 AND nodeid <= 95 ;
UPDATE request_tree SET node_name = 'questionToSearchSystem'  WHERE nodeid = 95 ;
--INSERT INTO node_types (type_name,comment) VALUES ('function','функция, определяющая понятие') ;