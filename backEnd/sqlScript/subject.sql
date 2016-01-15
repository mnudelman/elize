--DELETE FROM request_tree WHERE nodeid >= 90 AND  nodeid <= 90 ;
--UPDATE request_tree SET typeid = 6  WHERE nodeid >= 50 ;
--UPDATE request_tree SET comment = 'синоним ORDER'  WHERE nodeid >= 39 AND  nodeid <= 39 ;
--UPDATE request_tree SET parentid = 52  WHERE nodeid >= 89 AND nodeid <= 92 ;
UPDATE request_tree SET node_valid = 1  WHERE nodeid >= 87 ;