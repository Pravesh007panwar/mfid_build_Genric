/*ALTER TABLE mail_templates  ADD COLUMN mail_templates_types_id INT NULL  , ADD COLUMN  mail_templates_domain_id INT NULL  , MODIFY mail_templates_body LONGTEXT NULL ;*/
UPDATE mail_templates SET mail_templates_types_id = mail_templates_id ,mail_templates_domain_id = 0 ;
			
CREATE TABLE ad_domain
(     
ad_domain_id INT(5) NOT NULL AUTO_INCREMENT,
ad_domain_name VARCHAR(50) NOT NULL,
PRIMARY KEY (ad_domain_id)
)  ;
INSERT INTO ad_domain(ad_domain_name) VALUES ('local');
ALTER TABLE `user_detail`  ADD COLUMN `ad_domain_name` VARCHAR(50) NULL AFTER `emp_id`;		
UPDATE user_detail SET ad_domain_name='local' WHERE user_id=1;
UPDATE user_detail SET ad_domain_name='<default_ad_domain>' WHERE user_id=1;
ALTER TABLE properties ADD COLUMN public_server_ip VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN superadmin_admin_mails VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN mail_user_name VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN mime_type VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN mobile_ios_path VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN mobile_blackberry_path VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN mobile_android_path VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN mobile_windows_path VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN country_policy_notification_schedular_user VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN reprovisioning_seed_schedular_notification_day VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN reprovisioning_seed_schedular_notification VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN update_employeeid_schedular VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN verify_ldap_password VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN country_policy_expired_alert_interval VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN push_server_check_counter VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN mysql_server_check_counter VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN ntp_server_check_counter VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN log_report_schedular VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN server_schedular VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN database_schedular VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN redis_schedular VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN reprovisioning_seed_schedular VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN country_policy_expired_schedular VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN country_policy_expired_schedular_interval VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN country_policy_notification_schedular VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN country_superadmin_admin_mails VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN country_policy_time_interval VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN maximum_countries_allowed VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN user_country_policy_schedular VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN radius_server_check_counter VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN redis_server_check_counter VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN log_report_days VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN dashboard_schedular VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN fileRead_schedular VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN default_user_country_policy VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN default_from_timestamp VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN default_to_timestamp VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN sms_key_expire_time VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN employeeid_attribute VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN deny_notification_time_interval VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN qrcode_activation_key_expire_time VARCHAR(100) NULL;
ALTER TABLE properties ADD COLUMN allow_device_no VARCHAR(100) NULL;

UPDATE properties SET public_server_ip='http://server.authshieldserver.com/index.jsp';
UPDATE properties SET superadmin_admin_mails='abc@gmail.com';
UPDATE properties SET mail_user_name='testingq23@gmail.com';
UPDATE properties SET mime_type='both';
UPDATE properties SET mobile_ios_path='https://itunes.apple.com/us/app/one-touch-authentication/id952525756?mt=8';
UPDATE properties SET mobile_blackberry_path='auth-shield.com/blackberry/AuthShield_Mobile.jad';
UPDATE properties SET mobile_android_path='https://play.google.com/store/search?q=Authshield';
UPDATE properties SET mobile_windows_path='http://www.windowsphone.com/en-in/search?q=authshield';
UPDATE properties SET country_policy_notification_schedular_user='0 0 */2 * *';
UPDATE properties SET reprovisioning_seed_schedular_notification_day='3';
UPDATE properties SET reprovisioning_seed_schedular_notification='3';
UPDATE properties SET update_employeeid_schedular='no';
UPDATE properties SET verify_ldap_password='0 */2 * * *';
UPDATE properties SET country_policy_expired_alert_interval='1,24,36,48';
UPDATE properties SET push_server_check_counter='2,10';
UPDATE properties SET mysql_server_check_counter='2,10';
UPDATE properties SET ntp_server_check_counter='2,10';
UPDATE properties SET log_report_schedular='05 11 * * *';
UPDATE properties SET server_schedular='*/1 * * * *';
UPDATE properties SET database_schedular='00 00 * * 07';
UPDATE properties SET redis_schedular='58 15 * * *';
UPDATE properties SET reprovisioning_seed_schedular='no';
UPDATE properties SET country_policy_expired_schedular='*/30 * * * *';
UPDATE properties SET country_policy_expired_schedular_interval='30';
UPDATE properties SET country_policy_notification_schedular='*/5 * * * *';
UPDATE properties SET country_superadmin_admin_mails='puneet.vats@innefu.com';
UPDATE properties SET country_policy_time_interval='30';
UPDATE properties SET maximum_countries_allowed='12';
UPDATE properties SET user_country_policy_schedular='00 12 * * *';
UPDATE properties SET radius_server_check_counter='2,10';
UPDATE properties SET redis_server_check_counter='2,10';
UPDATE properties SET log_report_days='30';
UPDATE properties SET dashboard_schedular='48 16 * * *';
UPDATE properties SET fileRead_schedular='25 18 * * *';
UPDATE properties SET default_user_country_policy='India';
UPDATE properties SET default_from_timestamp='2018-09-09 23\:59';
UPDATE properties SET default_to_timestamp='2099-05-09 00\:00';
UPDATE properties SET sms_key_expire_time='300';
UPDATE properties SET employeeid_attribute='employeeID';
UPDATE properties SET deny_notification_time_interval='1,5,20,100,500';
UPDATE properties SET qrcode_activation_key_expire_time='300';
UPDATE properties SET allow_device_no='1';

CREATE TABLE auth_source_policy(auth_source_id INT(5) NOT NULL AUTO_INCREMENT , auth_source_type VARCHAR(100) ,PRIMARY KEY (`auth_source_id`));
INSERT INTO `auth_source_policy`(`auth_source_id`,`auth_source_type`) VALUES ( 1,'AD');
INSERT INTO `auth_source_policy`(`auth_source_id`,`auth_source_type`) VALUES ( 2,'LDAP');
INSERT INTO `auth_source_policy`(`auth_source_id`,`auth_source_type`) VALUES ( 3,'Local');
INSERT INTO `auth_source_policy`(`auth_source_id`,`auth_source_type`) VALUES ( 4,'ADFS');
ALTER TABLE `user_mapping` ADD COLUMN `auth_source_id` INT(5) NULL AFTER `activation_time`;
UPDATE user_mapping SET auth_source_id=3 WHERE user_id=1;
UPDATE user_mapping SET auth_source_id=1 WHERE user_id!=1;			-- for local

ALTER TABLE radius_server_credential ADD COLUMN adfs_url VARCHAR(500) NULL;
			

CREATE TABLE `country_ip_logs` (
  `country_ip_logs_id` INT(10) NOT NULL AUTO_INCREMENT,
  `country_name` VARCHAR(50) DEFAULT NULL,
  `start_ip` VARCHAR(50) DEFAULT NULL,
  `end_ip` VARCHAR(50) DEFAULT NULL,
  `log_type` VARCHAR(50) DEFAULT NULL,
  `response` VARCHAR(255) DEFAULT NULL,
  `created_by` VARCHAR(50) DEFAULT NULL,
  `created_date` DATETIME DEFAULT NULL,
  PRIMARY KEY (`country_ip_logs_id`)
) ENGINE=INNODB DEFAULT CHARSET=latin1;
ALTER TABLE country_ip_logs ADD COLUMN role INT(50) NULL;	

CREATE TABLE `user_country_log` (
  `user_country_log_id` INT(11) NOT NULL AUTO_INCREMENT,
  `admin_logon_id` VARCHAR(50) DEFAULT NULL,
  `domain_id` VARCHAR(30) DEFAULT NULL,
  `app_id` VARCHAR(30) DEFAULT NULL,
  `activity_time` TIMESTAMP NULL DEFAULT NULL,
  `allowed_countries` TEXT,
  `activity` TEXT,
  `activity_type` VARCHAR(30) DEFAULT NULL,
  `role` INT(11) DEFAULT NULL,
  PRIMARY KEY (`user_country_log_id`)
) ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

/*
CREATE TABLE `group_user` (
  `group_user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_logon_id` varchar(100) DEFAULT NULL,
  `group_flag` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`group_user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
*/

ALTER TABLE `ad_user` CHANGE `user_logon_id` `user_logon_id` VARCHAR(350) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL ;
ALTER TABLE `cbs_token` CHANGE `user_logon_id` `user_logon_id` VARCHAR(350) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL ;
ALTER TABLE `log_report` CHANGE `user_logon_id` `user_logon_id` VARCHAR(350) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL ;
ALTER TABLE `logs_detail` CHANGE `user_logon_id` `user_logon_id` VARCHAR(350) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL ;
ALTER TABLE `self_enrollment_logs` CHANGE `user_logon_id` `user_logon_id` VARCHAR(350) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL ;
ALTER TABLE `top_unsuccessful_attempts_user_dashboard` CHANGE `user_logon_id` `user_logon_id` VARCHAR(350) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL ;
ALTER TABLE `user_detail` CHANGE `user_logon_id` `user_logon_id` VARCHAR(350) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL ;
ALTER TABLE `user_detail_sync` CHANGE `user_logon_id` `user_logon_id` VARCHAR(350) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL ;
ALTER TABLE admin_log CHANGE admin_logon_id  admin_logon_id VARCHAR(350) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL ;
ALTER TABLE user_country_log CHANGE admin_logon_id  admin_logon_id VARCHAR(350) CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL ;

ALTER TABLE user_detail ADD COLUMN failure_count INT;

ALTER TABLE `logs_detail` CHANGE `logs_type` `logs_type` VARCHAR(50);

CREATE TABLE `group_user_scheduler` (
  `group_user_id` INT(11) NOT NULL AUTO_INCREMENT,
  `group_user_logon_id` VARCHAR(200) DEFAULT NULL,
  `group_domain_id` INT(11) DEFAULT NULL,
  PRIMARY KEY (`group_user_id`),
  UNIQUE KEY `NewIndex1` (`group_user_logon_id`)
);

ALTER TABLE properties ADD COLUMN login_auth VARCHAR(100);
ALTER TABLE properties ADD COLUMN user_secure_organisation VARCHAR(100);
ALTER TABLE properties ADD COLUMN user_secure_application VARCHAR(100);
ALTER TABLE properties ADD COLUMN user_domain VARCHAR(100);
ALTER TABLE properties ADD COLUMN user_secure_domain VARCHAR(100);
ALTER TABLE properties ADD COLUMN ad_server VARCHAR(100);
ALTER TABLE properties ADD COLUMN ad_base_dn VARCHAR(100);
ALTER TABLE properties ADD COLUMN ldap_filter VARCHAR(100);
ALTER TABLE properties ADD COLUMN ldap_default_domain VARCHAR(100);
ALTER TABLE properties ADD COLUMN usersearch_admin_name VARCHAR(100);
ALTER TABLE properties ADD COLUMN usersearch_domain VARCHAR(100);
ALTER TABLE properties ADD COLUMN ldap_server VARCHAR(100);
ALTER TABLE properties ADD COLUMN ldap_multidomain_flag VARCHAR(100);
ALTER TABLE properties ADD COLUMN usersearch_admin_password VARCHAR(100);
ALTER TABLE properties ADD COLUMN secure_login_ssl_flag VARCHAR(100);
ALTER TABLE properties ADD COLUMN ldap_multi_server_ip VARCHAR(100);

UPDATE properties SET login_auth ="AD";
UPDATE properties SET user_secure_organisation ="AuthShield";
UPDATE properties SET user_secure_application ="defaultApp";
UPDATE properties SET user_domain ="local";
UPDATE properties SET user_secure_domain ="default_domain";
UPDATE properties SET ad_server ="192.168.2.58:389";
UPDATE properties SET ad_base_dn ="dc=innefu,dc=com";
UPDATE properties SET ldap_filter ="no";
UPDATE properties SET ldap_default_domain ="innefu.com";
UPDATE properties SET usersearch_admin_name ="uid=zimbra,cn=admins,cn=zimbra";
UPDATE properties SET usersearch_domain ="";
UPDATE properties SET ldap_server ="192.168.1.210:389";
UPDATE properties SET ldap_multidomain_flag ="true";
UPDATE properties SET usersearch_admin_password ="70SB6hJ2ow3Z1xKilyY8pg==";
UPDATE properties SET secure_login_ssl_flag ="0";
UPDATE properties SET ldap_multi_server_ip ="192.168.2.227:389,192.168.2.210:389";


CREATE TABLE `finacal_group_user_scheduler` (
  `group_user_id` INT(11) NOT NULL AUTO_INCREMENT,
  `group_user_logon_id` VARCHAR(200) DEFAULT NULL,
  `group_domain_id` INT(11) DEFAULT NULL,
  PRIMARY KEY (`group_user_id`),
  UNIQUE KEY `NewIndex1` (`group_user_logon_id`)
) ENGINE=INNODB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;


/*Table structure for table `custom_auth_info` */

DROP TABLE IF EXISTS `custom_auth_info`;

CREATE TABLE `custom_auth_info` (
  `param_key` VARCHAR(50) NOT NULL,
  `param_value` VARCHAR(500) NOT NULL,
  `id` INT(10) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;

/*Data for the table `custom_auth_info` */

INSERT  INTO `custom_auth_info`(param_key,param_value,id) VALUES ('server','192.168.2.177',1),('port','80',2),('secure','0',3),('applicationid_pop','3',4),('applicationid_smtp','3',5),('applicationid_imap','3',6),('applicationid_webmail','0',7),('ldapdomain','192.168.2.200',8),('ldapport','389',9),('ldapusername','test.vats',10),('ldappassword','DQZPgZw3jC',11),('domain','',12),('passworlength','6',13),('otpfield','zimotp',14),('failover','0',15),('secureldap','0',16),('changes','3',17),('updatetime','10000',18),('serverIPs','192.168.2.210,192.168.2.237,192.168.2.230',19);

/* Added by Puneet for 2048 key*/

UPDATE pki SET pki_public_key='MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA+XbsJYF7BQuDdNzNIV9+t86BRO//IIEHY2fhXayL7iIWWotDu5F8i4+mMmuxJJ0WQ1QmXLR6388LwGSHgZVYJ3yVLAaQNEVHJ+dujc9RcIAWHjE3v0Hjfn8iDlj1JQH/4jWEU9Q7TpvH7GSFFGEprWc/lcEyW9/2m/NvjxabWp4/r+R/AZ1TLK0zRHMpk/UHX7ZAmfnCBH/6VYEt4xFS8w3jmiz1yE2Iu5tWbrM2DebKN4AFiz6A9gQF6hvWa8kKVvzW7C2IV2XIaHM6n8jWHUBPJ8Ej5CmaU1tQXSod5xfsuRIZUxMfB2Icu+1WPfixUKYNNeVOUrvBDy9w6LBZawIDAQAB',pki_private_key='MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQD5duwlgXsFC4N03M0hX363zoFE7/8ggQdjZ+FdrIvuIhZai0O7kXyLj6Yya7EknRZDVCZctHrfzwvAZIeBlVgnfJUsBpA0RUcn526Nz1FwgBYeMTe/QeN+fyIOWPUlAf/iNYRT1DtOm8fsZIUUYSmtZz+VwTJb3/ab82+PFptanj+v5H8BnVMsrTNEcymT9QdftkCZ+cIEf/pVgS3jEVLzDeOaLPXITYi7m1ZuszYN5so3gAWLPoD2BAXqG9ZryQpW/NbsLYhXZchoczqfyNYdQE8nwSPkKZpTW1BdKh3nF+y5EhlTEx8HYhy77VY9+LFQpg015U5Su8EPL3DosFlrAgMBAAECggEAFfDtP+E9tN8N3rCa7tVWMQwd14vfnc1rcm/3ukRLrGldcPTwbfto/7dl5T0OlWCm+CCwcmqXUhRaUr96IZ4aj6KIAO7KLnwXZZLtPit0B20573Q3FIB9kKnVkNB8g0GZRB1JOGb2w75fh6hRrM4Hmzj1C+gJqgYD9onN5UEWRJJxJaiUOrgfOrPxGqMMByz8DzZcOhMivXru9jw7LttHmwkk/0KEZVkSkZaQBYk4i56FHrA0k+C8bEOfzBumnKaPw1TA0RWjQFsVfv9dhcOnrzcVOr0kEnF5eI7LG4JQfpKwDKjkBxMP/2URU9ECOrgdXnt/Do+ZaUVCX9TMBKoxAQKBgQD80I2IK3XkOG6WCHQSsNbJW0Ggli3r5LIPfKiQkE3OhBF2IRa5N1J+wU1uBqEsyMfbCcjNs+9GRMZWm0mHvxxgrM9mUjN+30HP9Z73MF/6GoEfm48TtBau5dZJAIwHOLOIUR2bqFDnlz7iBBrvEHvPMbSSTjRHlF+Py/DUMv6EawKBgQD8m5BZkvb9QGOpov8n9hMAverl05P1inIH5mfRe05yuKH85kBvqUpVXjBvdcLJRYSEUDPEn9jGkaWbXSWT+zmI+YMRUIzkw0dWMSJ64rfi0ajKIfPGpQgb6s9SvuQCG8dtHh9J5CZxzhx2H+q1l6H+RiK/FTMl9NiyKHLt3DK/AQKBgHUMAVrX9D7zOY/Q3hyBLxAOZfX5Uc1zFlVBO7GifcNtNcBhVWnvCQySZkzYWOqpEo6Amy1RbygzUzhpsMNeYb8IgwU2bY0BxDCJ4U1EYksi1kFR/g37RL04v9sQm8QEJmqoU3LrnHl8dqqhh+7CzO+Cbb2G44F4Wj3zB87WxSt9AoGBAKAWAlQSBD8Y2FBAQQ3VL9PPiBbgkCsS8xM4nGCwkVW41sfML9fT5IzXZUCt06T0Tnf/z97zIlEtKlOco1z14E+DOOH3N2Meso3YE67nEXxIPHzlKXWhTtNKattYqG0Bp8/qQA/267pB0d22emtczkezsP+B8ulCEzZM1hER9IMBAoGAaqfLxqPd5guFHho/QclRtkqbT16cGLDlxI9WmGS6X8N5RafGEgsQZp2GzRCA4Nnipda+8gDTxrCs07X9igd1qtFSAI1rBckWp07qvC3SNP0KmDXzZHU05Edu9e+JzheJlDWZ1v0ye88yZ1dZN4WNJN1s8p+rA13H9jrEzZaLjQQ=',pki_modulus='+XbsJYF7BQuDdNzNIV9+t86BRO//IIEHY2fhXayL7iIWWotDu5F8i4+mMmuxJJ0WQ1QmXLR6388LwGSHgZVYJ3yVLAaQNEVHJ+dujc9RcIAWHjE3v0Hjfn8iDlj1JQH/4jWEU9Q7TpvH7GSFFGEprWc/lcEyW9/2m/NvjxabWp4/r+R/AZ1TLK0zRHMpk/UHX7ZAmfnCBH/6VYEt4xFS8w3jmiz1yE2Iu5tWbrM2DebKN4AFiz6A9gQF6hvWa8kKVvzW7C2IV2XIaHM6n8jWHUBPJ8Ej5CmaU1tQXSod5xfsuRIZUxMfB2Icu+1WPfixUKYNNeVOUrvBDy9w6LBZaw==' WHERE pki_id=1;			


/* Added by Saurabh for Logs*/

ALTER TABLE logs_detail ADD COLUMN reason VARCHAR(40) NULL;	

/* Added by Puneet vats  for country policy logs issue*/

ALTER TABLE `country_ip_logs`   CHANGE `role` `role` VARCHAR(50) NULL ;

/* Added by Saurabh for Country role */
INSERT INTO role(role_id,role_description) VALUES(7,'country');
INSERT INTO permission (permission_type, role_id) VALUES ('policy',7);

/*UPDATE role SET role_description='country' WHERE role_id=7;*/



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


/* Added by Abhimanyu for hide policy option for manager role user */
DELETE FROM permission WHERE permission_type = 'policy' AND role_id = 4;

ALTER TABLE `data_source`  CHANGE `data_source_ou_filter` `data_source_ou_filter` TEXT NULL ;


ALTER TABLE device_detail ADD COLUMN app_version VARCHAR(25) DEFAULT NULL;
ALTER TABLE device_detail ADD COLUMN os_version VARCHAR(25) DEFAULT NULL;

ALTER TABLE properties MODIFY COLUMN user_login VARCHAR(100) DEFAULT NULL;

/*For Build 1160 u2f integration and pin for desktop token*/
ALTER TABLE user_mapping ADD COLUMN pin_sms_otp VARCHAR(8);

ALTER TABLE user_mapping ADD COLUMN pin_sms_otp_time DATETIME;

ALTER TABLE token_limit ADD COLUMN u2f_token_limit INT(11);

UPDATE token_limit SET u2f_token_limit=100 WHERE token_limit_id=1;
/*Table structure for table `u2f` */
DROP TABLE IF EXISTS `u2f`;
CREATE TABLE `u2f` (
  `u2f_id` VARCHAR(50) NOT NULL,
  `u2f_data` TEXT NOT NULL,
  `creation_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` INT(15) NOT NULL,
  PRIMARY KEY (`u2f_id`),
  KEY `FK_u2f` (`user_id`),
  CONSTRAINT `FK_u2f` FOREIGN KEY (`user_id`) REFERENCES `user_detail` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=INNODB DEFAULT CHARSET=latin1;

/* Added by Abhimanyu for country violation policy */
ALTER TABLE log_report ADD COLUMN STATUS VARCHAR(15) DEFAULT NULL;



/*Table structure for table `oauth_client_details` */

DROP TABLE IF EXISTS `oauth_client_details`;

CREATE TABLE `oauth_client_details` (
  `client_id` VARCHAR(256) NOT NULL,
  `resource_ids` VARCHAR(256) DEFAULT NULL,
  `client_secret` VARCHAR(256) DEFAULT NULL,
  `scope` VARCHAR(256) DEFAULT NULL,
  `authorized_grant_types` VARCHAR(256) DEFAULT NULL,
  `web_server_redirect_uri` VARCHAR(256) DEFAULT NULL,
  `authorities` VARCHAR(256) DEFAULT NULL,
  `access_token_validity` INT(11) DEFAULT NULL,
  `refresh_token_validity` INT(11) DEFAULT NULL,
  `additional_information` VARCHAR(4096) DEFAULT NULL,
  `autoapprove` VARCHAR(256) DEFAULT NULL,
  `client_unique_id` VARCHAR(255) DEFAULT NULL,
  `company_name` VARCHAR(255) DEFAULT NULL,
  `company_size` VARCHAR(255) DEFAULT NULL,
  `creation_date` DATETIME DEFAULT NULL,
  `mobile` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`client_id`)
) ENGINE=INNODB DEFAULT CHARSET=latin1;

/*Data for the table `oauth_client_details` */

INSERT  INTO `oauth_client_details`(client_id,resource_ids,client_secret,scope,authorized_grant_types,web_server_redirect_uri,authorities,access_token_validity,refresh_token_validity,additional_information,autoapprove,client_unique_id,company_name,company_size,creation_date,mobile) VALUES ('admin',NULL,'$2a$10$aWMx6t4N62BZLuFh/StX9eOR1HrXsKiOVbOY1k3ktSkobZczCDxH2','foo,read,write','client_credentials,password,authorization_code,refresh_token',NULL,NULL,400,500,NULL,'true',NULL,NULL,NULL,NULL,NULL),('innefu',NULL,'innefu_abhi1','foo,read,write','client_credentials',NULL,NULL,60,500,NULL,'true',NULL,NULL,NULL,NULL,NULL);



/*Table structure for table `da_admin_log` */

DROP TABLE IF EXISTS `da_admin_log`;

CREATE TABLE `da_admin_log` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `admin_logon_id` VARCHAR(55) DEFAULT NULL,
  `user_logon_id` VARCHAR(55) DEFAULT NULL,
  `activity` TEXT,
  `activity_type` VARCHAR(25) DEFAULT NULL,
  `reason` VARCHAR(255) DEFAULT NULL,
  `activity_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;