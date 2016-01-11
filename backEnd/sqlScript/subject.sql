--DELETE FROM request_tree WHERE nodeid >= 54 ;
--UPDATE request_tree SET typeid = 6  WHERE nodeid >= 50 ;
UPDATE node_types SET type_name = 'sub_object'  WHERE typeid = 6 ;