/*For RIL not required
ALTER TABLE mail_templates  ADD COLUMN mail_templates_types_id INT NULL  , ADD COLUMN  mail_templates_domain_id INT NULL  , MODIFY mail_templates_body LONGTEXT NULL ;*/
UPDATE mail_templates SET mail_templates_types_id = mail_templates_id ,mail_templates_domain_id = 0 ;
			
CREATE TABLE ad_domain
(     
ad_domain_id INT(5) NOT NULL AUTO_INCREMENT,
ad_domain_name VARCHAR(50) NOT NULL,
PRIMARY KEY (ad_domain_id)
)  ;
INSERT INTO ad_domain(ad_domain_name) VALUES ('local');

ALTER TABLE `user_detail`  ADD COLUMN `ad_domain_name` VARCHAR(50) NULL AFTER `emp_id`;		

UPDATE user_detail SET ad_domain_name='local' where user_id=1;

/* UPDATE user_detail SET ad_domain_name='<default_ad_domain>' where user_id!=1;
 INSERT INTO ad_domain(ad_domain_name) VALUES ('local'); */

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
INSERT INTO `auth_source_policy`(`auth_source_id`,`auth_source_type`) VALUES ( NULL,'AD');
INSERT INTO `auth_source_policy`(`auth_source_id`,`auth_source_type`) VALUES ( NULL,'LDAP');
INSERT INTO `auth_source_policy`(`auth_source_id`,`auth_source_type`) VALUES ( NULL,'Local');
INSERT INTO `auth_source_policy`(`auth_source_id`,`auth_source_type`) VALUES ( NULL,'ADFS');
ALTER TABLE `user_mapping` ADD COLUMN `auth_source_id` INT(5) NULL AFTER `activation_time`;
UPDATE user_mapping SET auth_source_id=3 WHERE user_id=1;
UPDATE user_mapping SET auth_source_id=1 WHERE user_id!=1;			-- for local

/*For RIL not required
INSERT INTO role(role_description) VALUES('report');
INSERT INTO permission (permission_type, role_id) VALUES ('reports',6);*/

ALTER TABLE radius_server_credential ADD COLUMN adfs_url VARCHAR(500) NULL;
			

CREATE TABLE `country_ip_logs` (
  `country_ip_logs_id` int(10) NOT NULL AUTO_INCREMENT,
  `country_name` varchar(50) DEFAULT NULL,
  `start_ip` varchar(50) DEFAULT NULL,
  `end_ip` varchar(50) DEFAULT NULL,
  `log_type` varchar(50) DEFAULT NULL,
  `response` varchar(255) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  PRIMARY KEY (`country_ip_logs_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
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

/*For RIL not required
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
  `group_user_id` int(11) NOT NULL AUTO_INCREMENT,
  `group_user_logon_id` varchar(200) DEFAULT NULL,
  `group_domain_id` int(11) DEFAULT NULL,
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
  `group_user_id` int(11) NOT NULL AUTO_INCREMENT,
  `group_user_logon_id` varchar(200) DEFAULT NULL,
  `group_domain_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`group_user_id`),
  UNIQUE KEY `NewIndex1` (`group_user_logon_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;


/*Table structure for table `custom_auth_info` */

DROP TABLE IF EXISTS `custom_auth_info`;

CREATE TABLE `custom_auth_info` (
  `param_key` varchar(50) NOT NULL,
  `param_value` varchar(500) NOT NULL,
  `id` int(10) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;

/*Data for the table `custom_auth_info` */

insert  into `custom_auth_info`(param_key,param_value,id) values ('server','192.168.2.177',1),('port','80',2),('secure','0',3),('applicationid_pop','3',4),('applicationid_smtp','3',5),('applicationid_imap','3',6),('applicationid_webmail','0',7),('ldapdomain','192.168.2.200',8),('ldapport','389',9),('ldapusername','test.vats',10),('ldappassword','DQZPgZw3jC',11),('domain','',12),('passworlength','6',13),('otpfield','zimotp',14),('failover','0',15),('secureldap','0',16),('changes','3',17),('updatetime','10000',18),('serverIPs','192.168.2.210,192.168.2.237,192.168.2.230',19);

/* Added by Saurabh for Logs*/

ALTER TABLE logs_detail ADD COLUMN reason VARCHAR(40) NULL;		

/* Added by Puneet vats  for country policy logs issue*/
ALTER TABLE `country_ip_logs`   CHANGE `role` `role` VARCHAR(50) NULL;

/* Added by Saurabh for Country role */
INSERT INTO role(role_id,role_description) VALUES(7,'country');
INSERT INTO permission (permission_type, role_id) VALUES ('policy',7);

/*UPDATE role SET role_description='country' WHERE role_id=7;*/