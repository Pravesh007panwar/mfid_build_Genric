

/* New mobile policy Added by puneet vats*/
ALTER TABLE application ADD COLUMN mobile_app_uptodate_policy INT(2) DEFAULT '0';
ALTER TABLE application ADD COLUMN full_disk_encryption_policy INT(2) DEFAULT '0';
ALTER TABLE application ADD COLUMN screen_lock_policy INT(2) DEFAULT '0';
ALTER TABLE application ADD COLUMN device_not_rooted_policy INT(2) DEFAULT '0';
ALTER TABLE application ADD COLUMN passes_google_safety_policy INT(2) DEFAULT '0';
ALTER TABLE application ADD COLUMN finger_print_policy INT(2) DEFAULT '0';
ALTER TABLE application ADD COLUMN touch_or_face_id_policy INT(2) DEFAULT '0';

UPDATE application SET mobile_app_uptodate_policy=0,
full_disk_encryption_policy=0,
screen_lock_policy=0, 
screen_lock_policy=0,
device_not_rooted_policy=0,
passes_google_safety_policy=0,
finger_print_policy=0,
touch_or_face_id_policy=0;


ALTER TABLE user_mapping ADD COLUMN mobile_app_uptodate_policy INT(2) DEFAULT '0';
ALTER TABLE user_mapping ADD COLUMN mobile_app_uptodate_policy_user_flag INT(2) DEFAULT '0';
ALTER TABLE user_mapping ADD COLUMN full_disk_encryption_policy INT(2) DEFAULT '0';
ALTER TABLE user_mapping ADD COLUMN full_disk_encryption_policy_user_flag INT(2) DEFAULT '0';
ALTER TABLE user_mapping ADD COLUMN screen_lock_policy INT(2) DEFAULT '0';
ALTER TABLE user_mapping ADD COLUMN screen_lock_policy_user_flag INT(2) DEFAULT '0';
ALTER TABLE user_mapping ADD COLUMN device_not_rooted_policy INT(2) DEFAULT '0';
ALTER TABLE user_mapping ADD COLUMN device_not_rooted_policy_user_flag INT(2) DEFAULT '0';
ALTER TABLE user_mapping ADD COLUMN passes_google_safety_policy INT(2) DEFAULT '0';
ALTER TABLE user_mapping ADD COLUMN passes_google_safety_policy_user_flag INT(2) DEFAULT '0';
ALTER TABLE user_mapping ADD COLUMN finger_print_policy INT(2) DEFAULT '0';
ALTER TABLE user_mapping ADD COLUMN finger_print_policy_user_flag INT(2) DEFAULT '0';
ALTER TABLE user_mapping ADD COLUMN touch_or_face_id_policy INT(2) DEFAULT '0';
ALTER TABLE user_mapping ADD COLUMN touch_or_face_id_policy_user_flag INT(2) DEFAULT '0';


CREATE TABLE `device_os` (
  `device_os_id` INT(11) NOT NULL AUTO_INCREMENT,
  `device_os_version` VARCHAR(50) DEFAULT NULL,
  `device_os_type` VARCHAR(20) DEFAULT NULL,
  PRIMARY KEY (`device_os_id`)
) ENGINE=INNODB AUTO_INCREMENT=82 DEFAULT CHARSET=latin1;

/*Data for the table `device_os` */

INSERT  INTO `device_os`(device_os_id,device_os_version,device_os_type) VALUES (0,'none','default'),(1,'below 9.0 (Pie)','android'),(2,'below 8.1 (Oreo)','android'),(3,'below 8.0 (Oreo)','android'),(4,'below 7.1 (Nougat)','android'),(5,'below 7.0 (Nougat)','android'),(6,'below 6.0 (Marshmallow)','android'),(7,'below 5.1 (Lollipop)','android'),(8,'below 5.0 (Lollipop)','android'),(9,'below 4.4 (KitKat)','android'),(10,'below 4.3 (Jelly Bean)','android'),(11,'below 4.2 (Jelly Bean)','android'),(12,'below 4.1 (Jelly Bean)','android'),(13,'below 4.0 (Ice Cream Sandwich)','android'),(14,'below 12.1','iphone'),(15,'below 12.0','iphone'),(16,'below 11.4','iphone'),(17,'below 11.3','iphone'),(18,'below 11.2','iphone'),(19,'below 11.1','iphone'),(20,'below 11.0','iphone'),(21,'below 10.3','iphone'),(22,'below 10.2','iphone'),(23,'below 10.1','iphone'),(24,'below 10.0','iphone'),(25,'below 9.3','iphone'),(26,'below 9.2','iphone'),(27,'below 9.1','iphone'),(28,'below 9.0','iphone'),(29,'below 8.4','iphone'),(30,'below 8.3','iphone'),(31,'below 8.2','iphone'),(32,'below 8.1','iphone'),(33,'below 8.0','iphone'),(34,'below 7.1','iphone'),(35,'below 7.0','iphone'),(36,'below 6.1','iphone'),(37,'below 6.0','iphone'),(38,'below 5.1','iphone'),(39,'below 5.0','iphone');


ALTER TABLE application ADD COLUMN block_android_os_policy INT(11) DEFAULT '0';
ALTER TABLE application ADD COLUMN block_iphone_os_policy INT(11) DEFAULT '0';
ALTER TABLE application ADD COLUMN notify_android_os_policy INT(11) DEFAULT '0';
ALTER TABLE application ADD COLUMN notify_iphone_os_policy INT(11) DEFAULT '0';



UPDATE application SET block_android_os_policy=0,
block_iphone_os_policy=0,
notify_android_os_policy=0, 
notify_iphone_os_policy=0;


ALTER TABLE user_mapping ADD COLUMN block_android_os_policy INT(11) DEFAULT '0';
ALTER TABLE user_mapping ADD COLUMN block_android_os_policy_flag INT(2) DEFAULT '0';
ALTER TABLE user_mapping ADD COLUMN block_iphone_os_policy INT(11) DEFAULT '0';
ALTER TABLE user_mapping ADD COLUMN block_iphone_os_policy_flag INT(2) DEFAULT '0';
ALTER TABLE user_mapping ADD COLUMN notify_android_os_policy INT(11) DEFAULT '0';
ALTER TABLE user_mapping ADD COLUMN notify_android_os_policy_flag INT(2) DEFAULT '0';
ALTER TABLE user_mapping ADD COLUMN notify_iphone_os_policy INT(11) DEFAULT '0';
ALTER TABLE user_mapping ADD COLUMN notify_iphone_os_policy_flag INT(2) DEFAULT '0';

UPDATE device_os SET device_os_id = 0 WHERE device_os_type = 'default';


/* Added by Abhimanyu for BIO Generic agent*/

ALTER TABLE user_mapping ADD COLUMN sms_otp VARCHAR(100) DEFAULT NULL;
ALTER TABLE user_mapping ADD COLUMN  sms_otp_generation_time TIMESTAMP NULL DEFAULT NULL;


/*Table structure for table `bio_enrollment` */

DROP TABLE IF EXISTS `bio_enrollment`;

CREATE TABLE `bio_enrollment` (
  `bio_enrollment_id` INT(11) NOT NULL AUTO_INCREMENT,
  `bio_enrollment_license_id` INT(11) DEFAULT NULL,
  `bio_enrollment_system_name` VARCHAR(50) DEFAULT NULL,
  `bio_enrollment_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`bio_enrollment_id`)
) ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

/*Data for the table `bio_enrollment` */


/* Added by Abhimanyu for hide policy option for manager role user RIL specific*/
-- DELETE FROM permission WHERE permission_type = 'policy' AND role_id = 4;

ALTER TABLE `data_source`  CHANGE `data_source_ou_filter` `data_source_ou_filter` TEXT NULL ;

ALTER TABLE device_detail ADD COLUMN app_version VARCHAR(25) DEFAULT NULL;

ALTER TABLE device_detail ADD COLUMN os_version VARCHAR(25) DEFAULT NULL;


/* Added by Abhimanyu ---- Database migration query from 1084 to 1219 */


ALTER TABLE properties MODIFY COLUMN user_login VARCHAR(100) DEFAULT NULL;

/*For Build 1160 u2f integration and pin for desktop token*/
ALTER TABLE user_mapping ADD COLUMN pin_sms_otp  varchar(8);

ALTER TABLE user_mapping ADD COLUMN pin_sms_otp_time DATETIME;

ALTER TABLE token_limit ADD COLUMN u2f_token_limit INT(11);

UPDATE token_limit SET u2f_token_limit=100 WHERE token_limit_id=1;
/*Table structure for table `u2f` */
DROP TABLE IF EXISTS `u2f`;
CREATE TABLE `u2f` (
  `u2f_id` varchar(50) NOT NULL,
  `u2f_data` text NOT NULL,
  `creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int(15) NOT NULL,
  PRIMARY KEY (`u2f_id`),
  KEY `FK_u2f` (`user_id`),
  CONSTRAINT `FK_u2f` FOREIGN KEY (`user_id`) REFERENCES `user_detail` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/* Added by Abhimanyu for country violation policy */
ALTER TABLE log_report ADD COLUMN status VARCHAR(15) DEFAULT NULL;