/*
SQLyog Enterprise - MySQL GUI v8.1 
MySQL - 5.5.5-10.0.35-MariaDB : Database - mfid_common
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`mfid_common` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `mfid_common`;

/*Table structure for table `ad_domain` */

DROP TABLE IF EXISTS `ad_domain`;

CREATE TABLE `ad_domain` (
  `ad_domain_id` int(5) NOT NULL AUTO_INCREMENT,
  `ad_domain_name` varchar(50) NOT NULL,
  PRIMARY KEY (`ad_domain_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `ad_domain` */

insert  into `ad_domain`(ad_domain_id,ad_domain_name) values (1,'local');

/*Table structure for table `ad_user` */

DROP TABLE IF EXISTS `ad_user`;

CREATE TABLE `ad_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_logon_id` varchar(350) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `mobile` varchar(50) DEFAULT NULL,
  `ou` varchar(50) DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `ad_user` */

/*Table structure for table `admin_log` */

DROP TABLE IF EXISTS `admin_log`;

CREATE TABLE `admin_log` (
  `admin_log_id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_logon_id` varchar(350) DEFAULT NULL,
  `domain_name` varchar(30) DEFAULT NULL,
  `app_name` varchar(30) DEFAULT NULL,
  `activity_time` timestamp NULL DEFAULT NULL,
  `activity` text,
  `activity_type` varchar(50) DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  PRIMARY KEY (`admin_log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=68166 DEFAULT CHARSET=latin1;

/*Data for the table `admin_log` */

/*Table structure for table `application` */

DROP TABLE IF EXISTS `application`;

CREATE TABLE `application` (
  `application_id` int(11) NOT NULL AUTO_INCREMENT,
  `application_name` varchar(50) DEFAULT NULL,
  `domain_id` int(11) DEFAULT NULL,
  `notoken_policy` int(4) DEFAULT '0',
  `user_not_exist_policy` int(4) DEFAULT '0',
  `pin_check_policy` int(4) DEFAULT '0',
  `mobile_app_uptodate_policy` int(2) DEFAULT '0',
  `full_disk_encryption_policy` int(2) DEFAULT '0',
  `screen_lock_policy` int(2) DEFAULT '0',
  `device_not_rooted_policy` int(2) DEFAULT '0',
  `passes_google_safety_policy` int(2) DEFAULT '0',
  `finger_print_policy` int(2) DEFAULT '0',
  `touch_or_face_id_policy` int(2) DEFAULT '0',
  `block_android_os_policy` int(11) DEFAULT '0',
  `block_iphone_os_policy` int(11) DEFAULT '0',
  `notify_android_os_policy` int(11) DEFAULT '0',
  `notify_iphone_os_policy` int(11) DEFAULT '0',
  PRIMARY KEY (`application_id`),
  KEY `FK_application` (`domain_id`),
  CONSTRAINT `FK_application` FOREIGN KEY (`domain_id`) REFERENCES `domain` (`domain_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `application` */

insert  into `application`(application_id,application_name,domain_id,notoken_policy,user_not_exist_policy,pin_check_policy,mobile_app_uptodate_policy,full_disk_encryption_policy,screen_lock_policy,device_not_rooted_policy,passes_google_safety_policy,finger_print_policy,touch_or_face_id_policy,block_android_os_policy,block_iphone_os_policy,notify_android_os_policy,notify_iphone_os_policy) values (0,'defaultApp',0,1,0,0,0,0,0,0,0,0,0,0,0,0,0);

/*Table structure for table `application_transaction_mapping` */

DROP TABLE IF EXISTS `application_transaction_mapping`;

CREATE TABLE `application_transaction_mapping` (
  `app_mapping_id` int(11) NOT NULL AUTO_INCREMENT,
  `app_id` int(11) NOT NULL,
  `app_type` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`app_mapping_id`,`app_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `application_transaction_mapping` */

/*Table structure for table `auth_source_policy` */

DROP TABLE IF EXISTS `auth_source_policy`;

CREATE TABLE `auth_source_policy` (
  `auth_source_id` int(5) NOT NULL AUTO_INCREMENT,
  `auth_source_type` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`auth_source_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `auth_source_policy` */

insert  into `auth_source_policy`(auth_source_id,auth_source_type) values (1,'AD'),(2,'LDAP'),(3,'Local'),(4,'ADFS');

/*Table structure for table `authentication_dashboard` */

DROP TABLE IF EXISTS `authentication_dashboard`;

CREATE TABLE `authentication_dashboard` (
  `authentication_dashBoard_id` int(11) NOT NULL AUTO_INCREMENT,
  `total_hard_tokens` int(11) DEFAULT NULL,
  `total_sms_tokens` int(11) DEFAULT NULL,
  `total_bio_tokens` int(11) DEFAULT NULL,
  `total_mobile_tokens` int(11) DEFAULT NULL,
  `total_push_tokens` int(11) DEFAULT NULL,
  `application` varchar(30) DEFAULT NULL,
  `domain` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`authentication_dashBoard_id`)
) ENGINE=InnoDB AUTO_INCREMENT=308 DEFAULT CHARSET=latin1;

/*Data for the table `authentication_dashboard` */

/*Table structure for table `authentication_type` */

DROP TABLE IF EXISTS `authentication_type`;

CREATE TABLE `authentication_type` (
  `authentication_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `authentication_type_desc` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`authentication_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

/*Data for the table `authentication_type` */

insert  into `authentication_type`(authentication_type_id,authentication_type_desc) values (1,'hardToken'),(2,'smsToken'),(3,'mobileToken'),(4,'emergencyToken'),(5,'noToken'),(6,'bioToken'),(7,'pushToken');


/*Table structure for table `bio_enrollment` */

DROP TABLE IF EXISTS `bio_enrollment`;

CREATE TABLE `bio_enrollment` (
  `bio_enrollment_id` int(11) NOT NULL AUTO_INCREMENT,
  `bio_enrollment_license_id` int(11) DEFAULT NULL,
  `bio_enrollment_system_name` varchar(50) DEFAULT NULL,
  `bio_enrollment_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`bio_enrollment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

/*Data for the table `bio_enrollment` */

 
/*Table structure for table `bssid_detail` */

DROP TABLE IF EXISTS `bssid_detail`;

CREATE TABLE `bssid_detail` (
  `bssid_detail_id` int(11) NOT NULL AUTO_INCREMENT,
  `license_detail_id` int(11) DEFAULT NULL,
  `bssid` varchar(50) DEFAULT NULL,
  `ssid` varchar(50) DEFAULT NULL,
  `activation_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`bssid_detail_id`),
  KEY `FK_bssid_detail_bssid` (`license_detail_id`),
  CONSTRAINT `FK_bssid_detail_bssid` FOREIGN KEY (`license_detail_id`) REFERENCES `license_detail` (`license_detail_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `bssid_detail` */

/*Table structure for table `cbs_token` */

DROP TABLE IF EXISTS `cbs_token`;

CREATE TABLE `cbs_token` (
  `cbs_token_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_logon_id` varchar(350) DEFAULT NULL,
  `application_id` int(11) DEFAULT NULL,
  `token` varchar(20) DEFAULT NULL,
  `token_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`cbs_token_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `cbs_token` */

/*Table structure for table `country_ip_logs` */

DROP TABLE IF EXISTS `country_ip_logs`;

CREATE TABLE `country_ip_logs` (
  `country_ip_logs_id` int(10) NOT NULL AUTO_INCREMENT,
  `country_name` varchar(50) DEFAULT NULL,
  `start_ip` varchar(50) DEFAULT NULL,
  `end_ip` varchar(50) DEFAULT NULL,
  `log_type` varchar(50) DEFAULT NULL,
  `response` varchar(255) DEFAULT NULL,
  `created_by` varchar(50) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`country_ip_logs_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `country_ip_logs` */

/*Table structure for table `country_policy` */

DROP TABLE IF EXISTS `country_policy`;

CREATE TABLE `country_policy` (
  `country_policy_id` int(11) NOT NULL AUTO_INCREMENT,
  `country_policy_description` varchar(50) DEFAULT NULL,
  `country_names` text,
  `default_assign_flag` int(11) DEFAULT NULL,
  `country_policy_response` varchar(7) DEFAULT NULL,
  PRIMARY KEY (`country_policy_id`)
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=latin1;

/*Data for the table `country_policy` */

insert  into `country_policy`(country_policy_id,country_policy_description,country_names,default_assign_flag,country_policy_response) values (0,'default_policy','all',0,'prompt');

/*Table structure for table `data_source` */

DROP TABLE IF EXISTS `data_source`;

CREATE TABLE `data_source` (
  `data_source_id` int(11) NOT NULL AUTO_INCREMENT,
  `data_source_initailize_class` varchar(150) DEFAULT NULL,
  `data_source_url` varchar(20) DEFAULT NULL,
  `data_source_desc` varchar(40) DEFAULT NULL,
  `data_source_dn` varchar(300) DEFAULT NULL,
  `data_source_password` varchar(40) DEFAULT NULL,
  `data_source_filter` text,
  `data_source_name` varchar(50) DEFAULT NULL,
  `data_source_query` varchar(300) DEFAULT NULL,
  `data_ssl_flag` int(11) DEFAULT NULL,
  `data_admin` text,
  `data_source_ou_filter` text DEFAULT NULL,
  `data_source_attributes` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`data_source_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `data_source` */

insert  into `data_source`(data_source_id,data_source_initailize_class,data_source_url,data_source_desc,data_source_dn,data_source_password,data_source_filter,data_source_name,data_source_query,data_ssl_flag,data_admin,data_source_ou_filter,data_source_attributes) values (0,'test','test','test','test','test','test','test','test',NULL,NULL,NULL,NULL);

/*Table structure for table `deassociation_reason` */

DROP TABLE IF EXISTS `deassociation_reason`;

CREATE TABLE `deassociation_reason` (
  `deassociation_reason_id` int(11) NOT NULL AUTO_INCREMENT,
  `deassociation_reason_desc` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`deassociation_reason_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

/*Data for the table `deassociation_reason` */

insert  into `deassociation_reason`(deassociation_reason_id,deassociation_reason_desc) values (0,'Token has been submitted as a free token'),(1,'Token has been lost'),(2,'Token has been damaged'),(3,'Token is not working'),(4,'Token has been expired'),(6,'OTP is not matching'),(7,'Other');

/*Table structure for table `deny_by_country` */

DROP TABLE IF EXISTS `deny_by_country`;

CREATE TABLE `deny_by_country` (
  `deny_by_country_id` int(11) NOT NULL AUTO_INCREMENT,
  `date` timestamp NULL DEFAULT NULL,
  `country` varchar(30) DEFAULT NULL,
  `country_code` varchar(10) DEFAULT NULL,
  `failure_count` int(11) DEFAULT NULL,
  `domain_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`deny_by_country_id`),
  UNIQUE KEY `deny_by_country_id` (`deny_by_country_id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=latin1;

/*Data for the table `deny_by_country` */

/*Table structure for table `deny_country_dashboard` */

DROP TABLE IF EXISTS `deny_country_dashboard`;

CREATE TABLE `deny_country_dashboard` (
  `deny_country_dashboard_id` int(11) NOT NULL AUTO_INCREMENT,
  `country_code` varchar(10) DEFAULT NULL,
  `failure` int(11) DEFAULT NULL,
  `country` varchar(30) DEFAULT NULL,
  `domain` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`deny_country_dashboard_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `deny_country_dashboard` */

/*Table structure for table `device_detail` */

DROP TABLE IF EXISTS `device_detail`;

CREATE TABLE `device_detail` (
  `device_detail_id` int(11) NOT NULL AUTO_INCREMENT,
  `license_detail_id` int(11) DEFAULT NULL,
  `device_id` varchar(250) DEFAULT NULL,
  `private_key` text,
  `device_key` varchar(500) DEFAULT NULL,
  `activation_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `mobile_type` varchar(20) DEFAULT NULL,
  `ip` varchar(50) DEFAULT NULL,
  `ip_type` varchar(10) DEFAULT NULL,
  app_version VARCHAR(25),
  os_version VARCHAR(25),
  PRIMARY KEY (`device_detail_id`),
  KEY `FK_device_detail` (`license_detail_id`),
  CONSTRAINT `FK_device_detail` FOREIGN KEY (`license_detail_id`) REFERENCES `license_detail` (`license_detail_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `device_detail` */

/*Table structure for table `domain` */

DROP TABLE IF EXISTS `domain`;

CREATE TABLE `domain` (
  `domain_id` int(11) NOT NULL AUTO_INCREMENT,
  `domain_name` varchar(80) DEFAULT NULL,
  `data_source_id` int(11) DEFAULT NULL,
  `organisation_id` int(11) DEFAULT NULL,
  `token_limit_id` int(11) DEFAULT NULL,
  `hard_token_quantity` int(11) DEFAULT '0',
  `bio_token_quantity` int(11) DEFAULT '0',
  `mobile_token_quantity` int(11) DEFAULT '0',
  `sms_token_quantity` int(11) DEFAULT '0',
  `push_token_quantity` int(11) DEFAULT '0',
  `domain_policy_id` int(11) DEFAULT '0',
  `domain_flag` int(11) DEFAULT '0',
  PRIMARY KEY (`domain_id`),
  KEY `FK_domain_data_source` (`data_source_id`),
  KEY `FK_domain_org` (`organisation_id`),
  KEY `FK_domain_fktl` (`token_limit_id`),
  KEY `FK_domain_dp` (`domain_policy_id`),
  CONSTRAINT `FK_domain_data_source` FOREIGN KEY (`data_source_id`) REFERENCES `data_source` (`data_source_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_domain_dp` FOREIGN KEY (`domain_policy_id`) REFERENCES `domain_policy` (`domain_policy_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_domain_fktl` FOREIGN KEY (`token_limit_id`) REFERENCES `token_limit` (`token_limit_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_domain_org` FOREIGN KEY (`organisation_id`) REFERENCES `organisation` (`organisation_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `domain` */

insert  into `domain`(domain_id,domain_name,data_source_id,organisation_id,token_limit_id,hard_token_quantity,bio_token_quantity,mobile_token_quantity,sms_token_quantity,push_token_quantity,domain_policy_id,domain_flag) values (0,'default_domain',0,1,1,1,0,0,0,0,0,0);

/*Table structure for table `domain_policy` */

DROP TABLE IF EXISTS `domain_policy`;

CREATE TABLE `domain_policy` (
  `domain_policy_id` int(11) NOT NULL AUTO_INCREMENT,
  `domain_policy_name` varchar(150) DEFAULT NULL,
  `domain_policy_flag` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`domain_policy_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `domain_policy` */

insert  into `domain_policy`(domain_policy_id,domain_policy_name,domain_policy_flag) values (0,'No Policy','true'),(1,'User does not exist','true'),(2,'No token authentication','true'),(3,'Pin check','true');

/*Table structure for table `emergency_authentication_policy` */

DROP TABLE IF EXISTS `emergency_authentication_policy`;

CREATE TABLE `emergency_authentication_policy` (
  `emergency_authentication_policy_id` int(11) NOT NULL AUTO_INCREMENT,
  `emergency_authentication_policy_desc` varchar(100) DEFAULT NULL,
  `number_of_hours` int(11) DEFAULT NULL,
  `default_assign_flag` int(11) DEFAULT NULL,
  PRIMARY KEY (`emergency_authentication_policy_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `emergency_authentication_policy` */

insert  into `emergency_authentication_policy`(emergency_authentication_policy_id,emergency_authentication_policy_desc,number_of_hours,default_assign_flag) values (0,'default_policy',1,0);

/*Table structure for table `fingerprint_detail` */

DROP TABLE IF EXISTS `fingerprint_detail`;

CREATE TABLE `fingerprint_detail` (
  `fingerprint_detail_id` int(11) NOT NULL AUTO_INCREMENT,
  `license_detail_id` int(11) DEFAULT NULL,
  `finger_number` int(11) DEFAULT NULL,
  `finger_impression` longtext,
  `registered_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`fingerprint_detail_id`),
  KEY `FK_fingerprint_detail` (`license_detail_id`),
  CONSTRAINT `FK_fingerprint_detail` FOREIGN KEY (`license_detail_id`) REFERENCES `license_detail` (`license_detail_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `fingerprint_detail` */

/*Table structure for table `geo_city` */

DROP TABLE IF EXISTS `geo_city`;

CREATE TABLE `geo_city` (
  `geo_city_list_id` int(11) NOT NULL AUTO_INCREMENT,
  `geoname_id` int(11) DEFAULT NULL,
  `locale_code` varchar(50) DEFAULT NULL,
  `continent_code` varchar(50) DEFAULT NULL,
  `continent_name` varchar(50) DEFAULT NULL,
  `country_iso_code` varchar(50) DEFAULT NULL,
  `country_name` varchar(50) DEFAULT NULL,
  `subdivision_1_iso_code` varchar(50) DEFAULT NULL,
  `subdivision_1_name` varchar(100) DEFAULT NULL,
  `subdivision_2_iso_code` varchar(50) DEFAULT NULL,
  `subdivision_2_name` varchar(50) DEFAULT NULL,
  `city_name` varchar(100) DEFAULT NULL,
  `metro_code` varchar(50) DEFAULT NULL,
  `time_zone` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`geo_city_list_id`),
  KEY `NewIndex1` (`geoname_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `geo_city` */

/*Table structure for table `geo_ip` */

DROP TABLE IF EXISTS `geo_ip`;

CREATE TABLE `geo_ip` (
  `geo_ip_list_id` int(11) NOT NULL AUTO_INCREMENT,
  `ip_start` varchar(20) DEFAULT NULL,
  `ip_end` varchar(20) DEFAULT NULL,
  `geoname_id` int(11) DEFAULT NULL,
  `registered_country_geoname_id` int(11) DEFAULT NULL,
  `represented_country_geoname_id` int(11) DEFAULT NULL,
  `is_anonymous_proxy` varchar(50) DEFAULT NULL,
  `is_satellite_provider` varchar(50) DEFAULT NULL,
  `postal_code` varchar(50) DEFAULT NULL,
  `latitude` varchar(50) DEFAULT NULL,
  `longitude` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`geo_ip_list_id`),
  KEY `NewIndex1` (`ip_start`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `geo_ip` */

/*Table structure for table `group_user` */

DROP TABLE IF EXISTS `group_user`;

CREATE TABLE `group_user` (
  `group_user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_logon_id` varchar(100) DEFAULT NULL,
  `group_flag` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`group_user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `group_user` */

/*Table structure for table `group_user_scheduler` */

DROP TABLE IF EXISTS `group_user_scheduler`;

CREATE TABLE `group_user_scheduler` (
  `group_user_id` int(11) NOT NULL AUTO_INCREMENT,
  `group_user_logon_id` varchar(200) DEFAULT NULL,
  `group_domain_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`group_user_id`),
  UNIQUE KEY `NewIndex1` (`group_user_logon_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

/*Data for the table `group_user_scheduler` */

/*Table structure for table `hardtoken_offline_authentication_policy` */

DROP TABLE IF EXISTS `hardtoken_offline_authentication_policy`;

CREATE TABLE `hardtoken_offline_authentication_policy` (
  `hardToken_offline_authentication_policy_id` int(11) NOT NULL AUTO_INCREMENT,
  `hardToken_offline_authentication_policy_desc` varchar(100) DEFAULT NULL,
  `number_of_days` int(11) DEFAULT NULL,
  `default_assign_flag` int(11) DEFAULT NULL,
  PRIMARY KEY (`hardToken_offline_authentication_policy_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `hardtoken_offline_authentication_policy` */

insert  into `hardtoken_offline_authentication_policy`(hardToken_offline_authentication_policy_id,hardToken_offline_authentication_policy_desc,number_of_days,default_assign_flag) values (0,'default_policy',0,0);

/*Table structure for table `ip_detail` */

DROP TABLE IF EXISTS `ip_detail`;

CREATE TABLE `ip_detail` (
  `ip_detail_id` int(11) NOT NULL AUTO_INCREMENT,
  `ip_address` varchar(50) DEFAULT NULL,
  `last_ip_address` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ip_detail_id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;

/*Data for the table `ip_detail` */

insert  into `ip_detail`(ip_detail_id,ip_address,last_ip_address) values (0,'127.0.0.1','127.0.0.1');

/*Table structure for table `ip_details_dashboard` */

DROP TABLE IF EXISTS `ip_details_dashboard`;

CREATE TABLE `ip_details_dashboard` (
  `ip_details_dashboard_id` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(50) DEFAULT NULL,
  `ip_failure_count` int(11) DEFAULT NULL,
  `domain` varchar(30) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `insert_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`ip_details_dashboard_id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=latin1;

/*Data for the table `ip_details_dashboard` */

/*Table structure for table `license_detail` */

DROP TABLE IF EXISTS `license_detail`;

CREATE TABLE `license_detail` (
  `license_detail_id` int(11) NOT NULL AUTO_INCREMENT,
  `license_detail_key` varchar(75) DEFAULT NULL,
  `license_detail_generation_time` timestamp NULL DEFAULT NULL,
  `license_detail_activation_key` varchar(75) DEFAULT NULL,
  `license_type` varchar(75) DEFAULT NULL,
  `deassociate_status` int(11) DEFAULT NULL,
  `license_otp_serial` varchar(30) DEFAULT NULL,
  `license_flag` int(11) DEFAULT '1',
  `license_private_key` text,
  `license_pass` varchar(12) DEFAULT NULL,
  `domain_id` int(11) DEFAULT '0',
  `ip` varchar(20) DEFAULT NULL,
  `license_last_accept_time` timestamp NULL DEFAULT NULL,
  `license_message_generation_time` timestamp NULL DEFAULT NULL,
  `avilable_flag` int(11) DEFAULT NULL,
  `device_token` text,
  `mobile_type` text,
  `active_status` int(11) DEFAULT NULL,
  `description` varbinary(100) DEFAULT NULL,
  `oneday_flag` int(11) DEFAULT NULL,
  `qr_xml` text,
  `password` varchar(250) DEFAULT NULL,
  `license_registration_flag` int(11) DEFAULT '0',
  PRIMARY KEY (`license_detail_id`),
  UNIQUE KEY `uk_licence` (`license_detail_activation_key`),
  UNIQUE KEY `UK_fdwal1w1dme3m0f3f0stttppt` (`license_detail_activation_key`),
  KEY `FK_license_detail_domain` (`domain_id`),
  CONSTRAINT `FK_license_detail_domain` FOREIGN KEY (`domain_id`) REFERENCES `domain` (`domain_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2401 DEFAULT CHARSET=latin1;

/*Data for the table `license_detail` */

insert  into `license_detail`(license_detail_id,license_detail_key,license_detail_generation_time,license_detail_activation_key,license_type,deassociate_status,license_otp_serial,license_flag,license_private_key,license_pass,domain_id,ip,license_last_accept_time,license_message_generation_time,avilable_flag,device_token,mobile_type,active_status,description,oneday_flag,qr_xml,password,license_registration_flag) values (0,'123456','2013-09-09 10:54:30','N/A','free',0,'20121221163401p',1,NULL,NULL,0,NULL,NULL,'2016-05-20 17:02:06',0,NULL,NULL,0,NULL,1,NULL,NULL,0);

/*Table structure for table `lock_out_attempt_duration_policy` */

DROP TABLE IF EXISTS `lock_out_attempt_duration_policy`;

CREATE TABLE `lock_out_attempt_duration_policy` (
  `lock_out_attempt_duration_policy_id` int(11) NOT NULL AUTO_INCREMENT,
  `lock_out_attempt_duration_policy_desc` varchar(100) DEFAULT NULL,
  `number_of_attempts` int(11) DEFAULT NULL,
  `duration_of_lockout` int(11) DEFAULT NULL,
  `default_assign_flag` int(11) DEFAULT NULL,
  PRIMARY KEY (`lock_out_attempt_duration_policy_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `lock_out_attempt_duration_policy` */

insert  into `lock_out_attempt_duration_policy`(lock_out_attempt_duration_policy_id,lock_out_attempt_duration_policy_desc,number_of_attempts,duration_of_lockout,default_assign_flag) values (0,'default_policy',1000,1,0);

/*Table structure for table `log_report` */

DROP TABLE IF EXISTS `log_report`;

CREATE TABLE `log_report` (
  `log_report_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_logon_id` varchar(350) DEFAULT NULL,
  `app_name` varchar(50) DEFAULT NULL,
  `domain_name` varchar(50) DEFAULT NULL,
  `auth_type` varchar(20) DEFAULT NULL,
  `license_key` varchar(20) DEFAULT NULL,
  `result` varchar(70) DEFAULT NULL,
  `match_time_stamp_start` decimal(17,3) DEFAULT NULL,
  `match_time_stamp_end` decimal(17,3) DEFAULT NULL,
  `last_file_date` timestamp NULL DEFAULT NULL,
  `ip_address` varchar(50) DEFAULT NULL,
  `country_code` varchar(6) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `tile_type` varchar(10) DEFAULT NULL,
  `system_name` varchar(50) DEFAULT NULL,
  `logs_type` varchar(20) DEFAULT 'online',
  `status` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`log_report_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2650 DEFAULT CHARSET=latin1;

/*Data for the table `log_report` */

/*Table structure for table `login_time_dashboard` */

DROP TABLE IF EXISTS `login_time_dashboard`;

CREATE TABLE `login_time_dashboard` (
  `login_time_dashboard_id` int(11) NOT NULL AUTO_INCREMENT,
  `zero_hour_success` int(11) DEFAULT NULL,
  `one_hour_success` int(11) DEFAULT NULL,
  `two_hour_success` int(11) DEFAULT NULL,
  `three_hour_success` int(11) DEFAULT NULL,
  `four_hour_success` int(11) DEFAULT NULL,
  `five_hour_success` int(11) DEFAULT NULL,
  `six_hour_success` int(11) DEFAULT NULL,
  `seven_hour_success` int(11) DEFAULT NULL,
  `eight_hour_success` int(11) DEFAULT NULL,
  `nine_hour_success` int(11) DEFAULT NULL,
  `ten_hour_success` int(11) DEFAULT NULL,
  `eleven_hour_success` int(11) DEFAULT NULL,
  `twelve_hour_success` int(11) DEFAULT NULL,
  `thirteen_hour_success` int(11) DEFAULT NULL,
  `fourteen_hour_success` int(11) DEFAULT NULL,
  `fifthteen_hour_success` int(11) DEFAULT NULL,
  `sixteen_hour_success` int(11) DEFAULT NULL,
  `seventeen_hour_success` int(11) DEFAULT NULL,
  `eightteen_hour_success` int(11) DEFAULT NULL,
  `nineteen_hour_success` int(11) DEFAULT NULL,
  `twenty_hour_success` int(11) DEFAULT NULL,
  `twentione_hour_success` int(11) DEFAULT NULL,
  `twentitwo_hour_success` int(11) DEFAULT NULL,
  `twentithree_hour_success` int(11) DEFAULT NULL,
  `zero_hour_unsuccess` int(11) DEFAULT NULL,
  `one_hour_unsuccess` int(11) DEFAULT NULL,
  `two_hour_unsuccess` int(11) DEFAULT NULL,
  `three_hour_unsuccess` int(11) DEFAULT NULL,
  `four_hour_unsuccess` int(11) DEFAULT NULL,
  `five_hour_unsuccess` int(11) DEFAULT NULL,
  `six_hour_unsuccess` int(11) DEFAULT NULL,
  `seven_hour_unsuccess` int(11) DEFAULT NULL,
  `eight_hour_unsuccess` int(11) DEFAULT NULL,
  `nine_hour_unsuccess` int(11) DEFAULT NULL,
  `ten_hour_unsuccess` int(11) DEFAULT NULL,
  `eleven_hour_unsuccess` int(11) DEFAULT NULL,
  `twelve_hour_unsuccess` int(11) DEFAULT NULL,
  `thirteen_hour_unsuccess` int(11) DEFAULT NULL,
  `fourteen_hour_unsuccess` int(11) DEFAULT NULL,
  `fifthteen_hour_unsuccess` int(11) DEFAULT NULL,
  `sixteen_hour_unsuccess` int(11) DEFAULT NULL,
  `seventeen_hour_unsuccess` int(11) DEFAULT NULL,
  `eightteen_hour_unsuccess` int(11) DEFAULT NULL,
  `nineteen_hour_unsuccess` int(11) DEFAULT NULL,
  `twenty_hour_unsuccess` int(11) DEFAULT NULL,
  `twentione_hour_unsuccess` int(11) DEFAULT NULL,
  `twentitwo_hour_unsuccess` int(11) DEFAULT NULL,
  `twentithree_hour_unsuccess` int(11) DEFAULT NULL,
  `domain` varchar(50) DEFAULT NULL,
  `insert_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`login_time_dashboard_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

/*Data for the table `login_time_dashboard` */

/*Table structure for table `logs_detail` */

DROP TABLE IF EXISTS `logs_detail`;

CREATE TABLE `logs_detail` (
  `log_Id` int(11) NOT NULL AUTO_INCREMENT,
  `user_logon_id` varchar(350) DEFAULT NULL,
  `app_Id` varchar(10) DEFAULT NULL,
  `response` varchar(80) DEFAULT NULL,
  `request_time` timestamp NOT NULL DEFAULT '2014-11-13 13:12:55',
  `otp` varchar(10) DEFAULT NULL,
  `ip` varchar(50) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  `logs_type` varchar(50) DEFAULT NULL,
  `token_serial` varchar(40) DEFAULT NULL,
  `reason` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`log_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

/*Data for the table `logs_detail` */

/*Table structure for table `mail_templates` */

DROP TABLE IF EXISTS `mail_templates`;

CREATE TABLE `mail_templates` (
  `mail_templates_id` int(11) NOT NULL AUTO_INCREMENT,
  `mail_templates_body` longtext,
  `mail_templates_types` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `mail_templates_subject` varchar(400) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `mail_templates_app_assign_flag` int(11) DEFAULT NULL,
  `mail_templates_types_id` int(11) DEFAULT NULL,
  `mail_templates_domain_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`mail_templates_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

/*Data for the table `mail_templates` */

insert  into `mail_templates`(mail_templates_id,mail_templates_body,mail_templates_types,mail_templates_subject,mail_templates_app_assign_flag,mail_templates_types_id,mail_templates_domain_id) values (1,' <meta http-equiv=\"Content-Type\" content=\"text/html;charset=utf-8\"><meta charset=\"utf-8\"> Dear  {FIRSTNAME},<br><br>Thank you for enrolling with AuthShield Multi Factor Authentication system.<br><br>You can use the following details to access the self service portal for youraccount:<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;oURL : <a href=\"{USERURL}\">{USERURL}</a><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;oUser Name : {USERLOGONID}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;oPassword : {PASSWORD}<br><br>Kindly contact the administrator in case of any issues.<br><br><br><br>Best Regards,<br>Team AuthShield&nbsp;<p><img src=\"http://www.auth-shield.com/images/logo.png\" height=\"42\" width=\"100\"></p><p><br></p><p><br>Note: This is a system generated email. Kindly do not reply to this. </p>','ASSIGN_APPLICATION_MAIL','Thank you for enrolling with AuthShield Multi Factor Authentication system',1,1,0),(2,'Dear {FIRSTNAME},<br><br>You have now been enrolled with AuthShield Secure Two Factor Authentication System with SMS token.<br><br><br>Best Regards,<br>AuthShield Team<p><img src=\"http://www.auth-shield.com/images/logo.png\" height=\"42\" width=\"100\">&nbsp;</p>','SMS_MAIL','AuthShield',1,2,0),(3,'Dear {FIRSTNAME},<br><br>You have been assigned AuthShield Desktop One Touch Authentication by your system administrator to log into {APPLICATIONNAME}.<br>Please follow the process below to install and activate your Token  - <br><br>&nbsp;&nbsp;&nbsp; Download and install your Push One Touch Authentication Token for Mobiles -<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; o Android : <a href=\"{MOBILEAPIPATH}\">Download</a><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; o iOS:<a href=\"{IOSAPIPATH}\">Download</a><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; o Windows Mobile OS :<a href=\"{WINDOWSAPIPATH}\">Download</a><br><br>&nbsp;&nbsp;&nbsp; Please download and scan the QR code to activate the token. -<br><br> Although the process is seamless, we recommend the user to go through the user manual once before he activates the token. <br> The user manual is available in users login portal.<br><br><br>Best Regards,<br>AuthShield Team<p><img src=\"http://www.auth-shield.com/images/logo.png\" height=\"42\" width=\"100\">&nbsp;</p><p><br></p><p>{MAILATTACHMENTFILE4}</p>','BIO_TOKEN_ONLINE_MAIL','Online Bio Token',1,3,0),(4,'Dear {FIRSTNAME},<br><br>You have been assigned AuthShield Desktop One Touch Authentication by your system administrator to log into {APPLICATIONNAME}.<br>Please follow the process below to install and activate your Token  - <br><br>&nbsp;&nbsp;&nbsp; Download and install your Push One Touch Authentication Token for Mobiles -<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; o Android : <a href=\"{MOBILEAPIPATH}\">Download</a><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; o iOS:<a href=\"{IOSAPIPATH}\">Download</a><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; o Windows Mobile OS :<a href=\"{WINDOWSAPIPATH}\">Download</a><br><br>&nbsp;&nbsp;&nbsp; Please download and scan the QR code to activate the token. -<br><br> Although the process is seamless, we recommend the user to go through the user manual once before he activates the token. <br> The user manual is available in users login portal.<br><br><br>Best Regards,<br>AuthShield Team<p>&nbsp;<img src=\"http://www.auth-shield.com/images/logo.png\" height=\"42\" width=\"100\"></p><p><br></p><p>{MAILATTACHMENTFILE4}</p>','BIO_TOKEN_OFFLINE_MAIL','Offline Bio Token',1,4,0),(5,'Dear  {FIRSTNAME},<br><br>Thank you for enrolling with AuthShield Multi Factor Authentication system.<br><br>You have been assigned a Hard Token and it should reach you very soon. Your Hard Token Serial number is  {LICENSEKEY}. We request you to please note this number as this would aid us in troubleshooting any issues in the future.<br><br>You can use the following details to access the self service portal for your account:<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;oURL : {USERURL}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;oUser Name : {FIRSTNAME}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;oPassword : {PASSWORD}<br><br>Kindly contact the administrator in case of any issues.<br><br><thank you.=\"\" <=\"\" table=\"\"><br></thank><br>Best Regards,<br>Team AuthShield<br><img src=\"http://www.auth-shield.com/images/logo.png\" height=\"42\" width=\"100\"><br><br><p>Note: This is a system generated email. Kindly do not reply to this.</p>','HARDTOKEN_MAIL','Your Token Serial is {LICENSEKEY}',1,5,0),(6,'Dear  {FIRSTNAME},<br><br><you have=\"\" been=\"\" assigned=\"\" authshield=\"\" push=\"\" one=\"\" touch=\"\" authentication=\"\" by=\"\" your=\"\" system=\"\" administrator=\"\" to=\"\" log=\"\" into=\"\" {applicationname}.=\"\" <br=\"\">Please follow the process below to install and activate your Token  -<br><br>&nbsp;&nbsp;&nbsp; Download and install your  One Touch Authentication Token -<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; o Android : <a href=\"{MOBILEAPIPATH}\">Download</a><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; o Blackberry  :<a href=\"{BLACKBERRYAPIPATH}\">Download</a><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; o iOS:<a href=\"{IOSAPIPATH}\">Download</a><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; o Windows Mobile OS :<a href=\"{WINDOWSAPIPATH}\">Download</a><br><br>&nbsp;&nbsp;&nbsp; Please log into AuthShield server with the following credentials to activate your token -<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;oDomain : {DOMAINNAME}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;oApplication : {APPLICATIONNAME}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;oURL : {USERURL}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;oUser Name {FIRSTNAME}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;oPassword : {PASSWORD}<br><br>Kindly contact the administrator in case of any issues.<br><br>Although the process is seamless, we recommend the user to go through the user manual once before he activates the token. <br> The user manual is available in users login portal.</you><br><br><br>Best Regards,<br>AuthShield Team<p><img src=\"http://www.auth-shield.com/images/logo.png\" height=\"42\" width=\"100\">&nbsp;</p>','PUSH_TOKEN_ONLINE_MAIL','Online Push Token',1,6,0),(7,'Dear {FIRSTNAME},<br><br>You have been assigned AuthShield Push One Touch Authentication by your system administrator to log into {APPLICATIONNAME}.<br>Please follow the process below to install and activate your Token  - <br><br>&nbsp;&nbsp;&nbsp; Download and install your Push One Touch Authentication Token for Mobiles -<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; o Android : <a href=\"{MOBILEAPIPATH}\">Download</a><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; o iOS:<a href=\"{IOSAPIPATH}\">Download</a><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; o Windows Mobile OS :<a href=\"{WINDOWSAPIPATH}\">Download</a><br><br>&nbsp;&nbsp;&nbsp; Download and install your Push One Touch Authentication Token for Desktops- <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   oWindows x86 :\" \"<a href=\"{DESKTOPWIN86APIPATH}\">Download</a><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   oWindows x64 :\" \"<a href=\"{DESKTOPWIN64APIPATH}\">Download</a><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   oMac OS :\" \"<a href=\"{DESKTOPMACAPIPATH}\">Download</a><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   oLinux OS :\" \"<a href=\"{DESKTOPLINAPIPATH}\">Download</a><br><br>&nbsp;&nbsp;&nbsp; Please download and scan the QR code to activate the token. You could also use the following license key and server details to activate the Token  -<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   oLicense Key : {LICENSEKEY}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   oServer IP Address : {QRHOST}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   oPort Number : {QRPORT}<br><br>You can use the following details to access the self service portal for your account:<br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;oURL : <a href=\"{USERURL}\">{USERURL}</a><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;oPassword : {PASSWORD}<br><br>Kindly contact the administrator in case of any issues.<br><br><br><br> Although the process is seamless, we recommend the user to go through the user manual once before he activates the token.<br><br><br>Best Regards,<br>AuthShield Team<p><img src=\"http://www.auth-shield.com/images/logo.png\" height=\"42\" width=\"100\"></p><p><br><br></p><p>&nbsp;{QRCODE}{MAILATTACHMENTFILE2}</p>','PUSH_TOKEN_OFFLINE_MAIL','Offline Push Token',1,7,0),(8,'Dear  {FIRSTNAME},<br><br>You have been assigned AuthShield Mobile Token by your system administrator to log into {APPLICATIONNAME}. <br><br>&nbsp;&nbsp;&nbsp; Download and install your Mobile Token - <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; o Android : <a href=\"{MOBILEAPIPATH}\">Download</a><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; o Blackberry  : <a href=\"{BLACKBERRYAPIPATH}\">Download</a><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; o iOS: <a href=\"{IOSAPIPATH}\">Download</a><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; o Windows Mobile OS : <a href=\"{WINDOWSAPIPATH}\">Download</a><br><br>&nbsp;&nbsp;&nbsp; Please log into AuthShield server with the following credentials to activate your token - <br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;oDomain : {DOMAINNAME}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;oApplication : {APPLICATIONNAME}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;oURL : {USERURL}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;oUser Name : {FIRSTNAME}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;oPassword : {PASSWORD}<br>We strongly recommend that you change your password after logging in.<br><br>Kindly contact the administrator in case of any issues.<br><br><br><br> Although the process is seamless, we recommend the user to go through the user manual once before activates the token.<br> The user manual is attached for further information.<br><br>Kindly contact the system administrator in case of any issues.<br><br><br>Best Regards,<br>AuthShield Team<p><img src=\"http://www.auth-shield.com/images/logo.png\" height=\"42\" width=\"100\">&nbsp;</p>','MOBILE_TOKEN_ONLINE_MAIL','Online Mobile Token',1,8,0),(9,'Dear {FIRSTNAME},<br><br>You have been assigned AuthShield Mobile Token by your system administrator to log into {APPLICATIONNAME}<br>Please follow the process below to install and activate your Token  -<br><br>&nbsp;&nbsp;&nbsp; Download and install your Mobile Token -<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; o Android : <a href=\"{MOBILEAPIPATH}\">Download</a><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; o Blackberry  : <a href=\"{BLACKBERRYAPIPATH}\">Download</a><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; o iOS: <a href=\"{IOSAPIPATH}\">Download</a><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; o Windows Mobile OS : <a href=\"{WINDOWSAPIPATH}\">Download</a><br><br>&nbsp;&nbsp;&nbsp; Once you have downloaded the token, kindly scan the attached QR Code for activation. You can also find the QR code by accessing the portal with the following details-<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;oDomain {DOMAINNAME}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;oApplication : {APPLICATIONNAME}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;oURL : {USERURL}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;oUser Name : {FIRSTNAME}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;oPassword : {PASSWORD}<br><br>Kindly contact the administrator in case of any issues.<br><br><br><br>Although the process is seamless, we recommend the user to go through the user manual once before he activates the token.<br> The user manual is attached for further information.<br><br>Kindly contact the system administrator in case of any issues.<br><br><br>Best Regards,<br>AuthShield Team<p><img src=\"http://www.auth-shield.com/images/logo.png\" height=\"42\" width=\"100\"></p><p><br>&nbsp;</p><p>{QRCODE}{MAILATTACHMENTFILE1}</p>','MOBILE_TOKEN_OFFLINE_MAIL','Offline Mobile Token readonly',1,9,0),(10,'Dear {FIRSTNAME},<br><br>Your emergency one time access code is  {EMERGENCYOTP}. Do not share it with anyone.<br>Please contact the administrator in case of any issue.<br><br>Regards,<br>Team AuthShield&nbsp;<p><img src=\"http://www.auth-shield.com/images/logo.png\" height=\"42\" width=\"100\"><br><br></p><p>Note:- This is system generated e-mail. Kindly do not respond to it.</p>','EMERGENCY_MAIL','Your access code',1,10,0),(11,'click on the link to reset your password <a href=\"{PASSWORDRESETLINK}\"> {PASSWORDRESETLINK}</a><p><br></p><p>Regards,<br>Team AuthShield&nbsp;<p><img src=\"http://www.auth-shield.com/images/logo.png\" height=\"42\" width=\"100\"></p></p><p><br></p>','RESET_PASSWORD_MAIL','Reset Password',1,11,0),(12,'your password is  {PASSWORD}&nbsp;<p><br></p><p>Regards,<br>Team AuthShield&nbsp;<p><img src=\"http://www.auth-shield.com/images/logo.png\" height=\"42\" width=\"100\"></p></p><p><br></p>','NEW_PASSWORD_MAIL','New Password',1,12,0),(13,'Dear {FIRSTNAME},<br><br>You have been assigned AuthShield Push One Touch Authentication and Application name {APPLICATIONNAME}.<br><br>Your successful activated device details are : <br><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;o Device Id : {DEVICEID}<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;o DeviceType : {MOBILETYPE} <br><br>Kindly contact the administrator in case of any issues.<br><br><thank you.=\"\" <=\"\" table=\"\"><br></thank><br>Best Regards,<br>Team AuthShield<br><p><img src=\"http://www.auth-shield.com/images/logo.png\" height=\"42\" width=\"100\"></p><p><br></p>Note: This is a system generated email. Kindly do not reply to this.&nbsp;','DEVICE_ACTIVATION_MAIL','NEW DEVICE ACTIVATION ALERT ',1,13,0),(14,'<br><br>Your one time access code is {OTP} . Do not share it with anyone. <br>Please contact the administrator in case of any issue. <br><br>Regards, <br>Team AuthShield <br><p><img src=\"http://www.auth-shield.com/images/logo.png\" height=\"42\" width=\"100\"></p><p><br></p>Note:- This is system generated e-mail. Kindly do not respond to it. ','SMS_OTP_MAIL','Your access code ',1,14,0),(15,'An account has been locked for security reasons, this means that there have been too many attempts to sign in to the account with the incorrect OTP. As a security measure, your account has been locked to prevent unauthorized users from being able to access it.<br>Please contact the administrator <br> <p><br></p><p>Best Regards,<br>Team AuthShield&nbsp;<p><img src=\"http://www.auth-shield.com/images/logo.png\" height=\"42\" width=\"100\"></p></p><p><br></p>','USER_LOCKED_MAIL','Account Blocked ',1,15,0);

/*Table structure for table `network_time_policy` */

DROP TABLE IF EXISTS `network_time_policy`;

CREATE TABLE `network_time_policy` (
  `network_time_policy_id` int(11) NOT NULL AUTO_INCREMENT,
  `network_time_policy_desc` varchar(50) DEFAULT NULL,
  `network_time_policy_type` varchar(15) DEFAULT NULL,
  `default_assign_flag` int(11) DEFAULT NULL,
  PRIMARY KEY (`network_time_policy_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `network_time_policy` */

insert  into `network_time_policy`(network_time_policy_id,network_time_policy_desc,network_time_policy_type,default_assign_flag) values (0,'default_network_time_policy','defaultType',0);

/*Table structure for table `network_time_policy_mapping` */

DROP TABLE IF EXISTS `network_time_policy_mapping`;

CREATE TABLE `network_time_policy_mapping` (
  `network_time_policy_mapping_id` int(11) NOT NULL AUTO_INCREMENT,
  `network_time_policy_id` int(11) DEFAULT NULL,
  `ipA` varchar(50) DEFAULT NULL,
  `ipB` varchar(50) DEFAULT NULL,
  `date1` varchar(15) DEFAULT NULL,
  `date2` varchar(15) DEFAULT NULL,
  `time1` varchar(10) DEFAULT NULL,
  `time2` varchar(10) DEFAULT NULL,
  `network_time_rule_type` varchar(20) DEFAULT NULL,
  `network_time_policy_response` varchar(7) DEFAULT NULL,
  PRIMARY KEY (`network_time_policy_mapping_id`),
  KEY `FK_network_time_policy_mapping_fk_ntp` (`network_time_policy_id`),
  CONSTRAINT `FK_network_time_policy_mapping_fk_ntp` FOREIGN KEY (`network_time_policy_id`) REFERENCES `network_time_policy` (`network_time_policy_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `network_time_policy_mapping` */

insert  into `network_time_policy_mapping`(network_time_policy_mapping_id,network_time_policy_id,ipA,ipB,date1,date2,time1,time2,network_time_rule_type,network_time_policy_response) values (1,0,'-','-','-','-','-','-','defaultRangeType','prompt');

/*Table structure for table `never_loggedin_dashboard` */

DROP TABLE IF EXISTS `never_loggedin_dashboard`;

CREATE TABLE `never_loggedin_dashboard` (
  `never_loggedin_dashboard_id` int(11) NOT NULL AUTO_INCREMENT,
  `application` varchar(50) DEFAULT NULL,
  `never_loggedin_count` int(11) DEFAULT NULL,
  `domain` varchar(50) DEFAULT NULL,
  `insert_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`never_loggedin_dashboard_id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=latin1;

/*Data for the table `never_loggedin_dashboard` */

/*Table structure for table `organisation` */

DROP TABLE IF EXISTS `organisation`;

CREATE TABLE `organisation` (
  `organisation_id` int(11) NOT NULL AUTO_INCREMENT,
  `organisation_name` varchar(100) DEFAULT NULL,
  `orqanisation_priority_flag` varchar(20) DEFAULT NULL,
  `token_limit_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`organisation_id`),
  KEY `FK_organisation_fk` (`token_limit_id`),
  CONSTRAINT `FK_organisation_fk` FOREIGN KEY (`token_limit_id`) REFERENCES `token_limit` (`token_limit_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `organisation` */

insert  into `organisation`(organisation_id,organisation_name,orqanisation_priority_flag,token_limit_id) values (1,'AuthShield','secondary',1);

/*Table structure for table `otp_details` */

DROP TABLE IF EXISTS `otp_details`;

CREATE TABLE `otp_details` (
  `otp_details_id` int(11) NOT NULL AUTO_INCREMENT,
  `otp` varchar(100) DEFAULT NULL,
  `otp_time_stamp_start` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `otp_time_stamp_end` timestamp NOT NULL DEFAULT '2013-01-04 18:44:48',
  `counter` int(11) DEFAULT NULL,
  `last_otp` varchar(100) DEFAULT NULL,
  `active_status` int(11) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `last_otp_updation_time` timestamp NULL DEFAULT '2013-01-04 18:44:48',
  `available_flag` int(11) DEFAULT '0',
  `domain_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`otp_details_id`),
  KEY `FK_otp_details` (`domain_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `otp_details` */

insert  into `otp_details`(otp_details_id,otp,otp_time_stamp_start,otp_time_stamp_end,counter,last_otp,active_status,description,last_otp_updation_time,available_flag,domain_id) values (0,'G0VTaKTeGWs=','2014-04-05 10:33:37','2013-10-25 15:15:18',69,'L3v4HXWmcehhZEFPyiH9jg==',0,'testNic','2013-01-04 18:44:48',0,NULL);

/*Table structure for table `permission` */

DROP TABLE IF EXISTS `permission`;

CREATE TABLE `permission` (
  `permission_id` int(11) NOT NULL AUTO_INCREMENT,
  `permission_type` varchar(150) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`permission_id`),
  KEY `FK_permission_role` (`role_id`),
  CONSTRAINT `FK_permission_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=183 DEFAULT CHARSET=latin1;

/*Data for the table `permission` */

insert  into `permission`(permission_id,permission_type,role_id) values (1,'managedomain',1),(2,'manageapplication',1),(3,'manageapplication',2),(5,'managedomain',2),(6,'manageorganisation',1),(7,'importuser',1),(8,'importuser',2),(9,'importuser',3),(10,'manageuser',1),(11,'manageuser',2),(12,'manageuser',3),(13,'associateapplication',1),(14,'associateapplication',2),(15,'associateapplication',3),(16,'lockunlockuser',1),(17,'lockunlockuser',2),(18,'lockunlockuser',3),(19,'lockunlockuser',4),(20,'changepassword',1),(21,'changepassword',2),(22,'changepassword',3),(23,'changepassword',4),(24,'changepassword',5),(25,'assigntokentodomain',1),(26,'assigntokentodomain',2),(27,'changeauthtype',1),(28,'changeauthtype',2),(29,'changeauthtype',3),(30,'changeauthtype',4),(31,'assignemergencyauth',1),(32,'assignemergencyauth',2),(33,'assignemergencyauth',3),(34,'assignemergencyauth',4),(35,'associatetoken',1),(36,'associatetoken',2),(37,'associatetoken',3),(38,'associatetoken',4),(39,'deassociatetoken',1),(40,'deassociatetoken',2),(41,'deassociatetoken',3),(42,'deassociatetoken',4),(43,'activatetoken',1),(44,'activatetoken',2),(45,'activatetoken',3),(46,'activatetoken',4),(47,'activatetoken',5),(48,'resynctoken',1),(49,'resynctoken',2),(50,'resynctoken',3),(51,'resynctoken',4),(52,'resynctoken',5),(53,'locktoken',1),(54,'locktoken',2),(55,'locktoken',3),(56,'locktoken',4),(57,'locktoken',1),(58,'locktoken',2),(59,'locktoken',3),(60,'locktoken',4),(61,'unlocktoken',1),(62,'unlocktoken',2),(63,'unlocktoken',3),(64,'unlocktoken',4),(65,'locksmstoken',1),(66,'locksmstoken',2),(67,'locksmstoken',3),(68,'locksmstoken',4),(69,'unlocksmstoken',1),(70,'unlocksmstoken',2),(71,'unlocksmstoken',3),(72,'unlocksmstoken',4),(73,'associatelicensekey',1),(74,'associatelicensekey',2),(75,'associatelicensekey',3),(76,'associatelicensekey',4),(77,'shadoow',1),(78,'shadoow',2),(79,'shadoow',3),(80,'shadoow',4),(81,'adddemotemanager',1),(82,'adddemotemanager',2),(83,'adddemotemanager',3),(87,'hardtokenoffline',1),(88,'hardtokenoffline',2),(89,'hardtokenoffline',3),(90,'hardtokenoffline',4),(91,'hardtokenvalidity',1),(92,'hardtokenvalidity',2),(93,'hardtokenvalidity',3),(94,'hardtokenvalidity',4),(95,'smstokenpolicy',1),(96,'smstokenpolicy',2),(97,'smstokenpolicy',3),(98,'smstokenpolicy',4),(99,'mobiletokenpolicy',1),(100,'mobiletokenpolicy',2),(101,'mobiletokenpolicy',3),(102,'mobiletokenpolicy',4),(103,'softtokenpolicy',1),(104,'softtokenpolicy',2),(105,'softtokenpolicy',3),(106,'softtokenpolicy',4),(107,'lockoutatempt',1),(108,'lockoutatempt',2),(109,'lockoutatempt',3),(110,'lockoutatempt',4),(111,'emergencyauth',1),(112,'emergencyauth',2),(113,'emergencyauth',3),(114,'emergencyauth',4),(115,'assignpolicy',1),(116,'assignpolicy',2),(117,'assignpolicy',3),(118,'assignpolicy',4),(119,'startstopradius',1),(120,'startstopradius',2),(121,'startstopradius',3),(122,'startstopradius',4),(123,'manageradius',1),(124,'manageradius',2),(125,'manageradius',3),(126,'manageradius',4),(127,'usersyncscheduler',1),(128,'usersyncscheduler',2),(129,'usersyncscheduler',3),(130,'helpdesk',1),(131,'helpdesk',2),(132,'helpdesk',3),(133,'helpdesk',4),(134,'helpdesk',5),(136,'adddemotemanager',3),(137,'pushtokenpolicy',1),(138,'pushtokenpolicy',2),(139,'pushtokenpolicy',3),(140,'pushtokenpolicy',4),(141,'managetoken',1),(142,'managetoken',2),(143,'managetoken',3),(144,'managetoken',4),(145,'modifydatabaseconnection',1),(146,'modifydatabaseconnection',2),(151,'assigndomainpolicy',1),(152,'assigndomainpolicy',2),(153,'assigndomainpolicy',3),(154,'deletesuperadmin',1),(155,'addmanager',1),(156,'addmanager',2),(157,'addmanager',3),(158,'resyncserverclock',1),(159,'resyncserverclock',2),(160,'resyncserverclock',3),(161,'administration',1),(162,'administration',2),(163,'administration',3),(164,'administration',4),(165,'tokens',1),(166,'tokens',2),(167,'tokens',3),(168,'tokens',4),(169,'policy',1),(170,'policy',2),(171,'policy',3),(173,'reports',1),(174,'reports',2),(175,'reports',3),(176,'reports',4),(177,'manageuser',4),(180,'reports',6),(181,'policy',7),(182,'whitelisteddevice','5');

/*Table structure for table `pin_check_policy` */

DROP TABLE IF EXISTS `pin_check_policy`;

CREATE TABLE `pin_check_policy` (
  `pin_check_policy_id` int(11) NOT NULL AUTO_INCREMENT,
  `pin_check_policy_status` int(11) DEFAULT '0',
  PRIMARY KEY (`pin_check_policy_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `pin_check_policy` */

insert  into `pin_check_policy`(pin_check_policy_id,pin_check_policy_status) values (0,0),(1,1);

/*Table structure for table `pki` */

DROP TABLE IF EXISTS `pki`;

CREATE TABLE `pki` (
  `pki_id` int(11) NOT NULL AUTO_INCREMENT,
  `pki_public_key` text,
  `pki_private_key` text,
  `pki_modulus` text,
  `pki_exponent` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`pki_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `pki` */

insert  into `pki`(pki_id,pki_public_key,pki_private_key,pki_modulus,pki_exponent) values (1,'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA+XbsJYF7BQuDdNzNIV9+t86BRO//IIEHY2fhXayL7iIWWotDu5F8i4+mMmuxJJ0WQ1QmXLR6388LwGSHgZVYJ3yVLAaQNEVHJ+dujc9RcIAWHjE3v0Hjfn8iDlj1JQH/4jWEU9Q7TpvH7GSFFGEprWc/lcEyW9/2m/NvjxabWp4/r+R/AZ1TLK0zRHMpk/UHX7ZAmfnCBH/6VYEt4xFS8w3jmiz1yE2Iu5tWbrM2DebKN4AFiz6A9gQF6hvWa8kKVvzW7C2IV2XIaHM6n8jWHUBPJ8Ej5CmaU1tQXSod5xfsuRIZUxMfB2Icu+1WPfixUKYNNeVOUrvBDy9w6LBZawIDAQAB','MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQD5duwlgXsFC4N03M0hX363zoFE7/8ggQdjZ+FdrIvuIhZai0O7kXyLj6Yya7EknRZDVCZctHrfzwvAZIeBlVgnfJUsBpA0RUcn526Nz1FwgBYeMTe/QeN+fyIOWPUlAf/iNYRT1DtOm8fsZIUUYSmtZz+VwTJb3/ab82+PFptanj+v5H8BnVMsrTNEcymT9QdftkCZ+cIEf/pVgS3jEVLzDeOaLPXITYi7m1ZuszYN5so3gAWLPoD2BAXqG9ZryQpW/NbsLYhXZchoczqfyNYdQE8nwSPkKZpTW1BdKh3nF+y5EhlTEx8HYhy77VY9+LFQpg015U5Su8EPL3DosFlrAgMBAAECggEAFfDtP+E9tN8N3rCa7tVWMQwd14vfnc1rcm/3ukRLrGldcPTwbfto/7dl5T0OlWCm+CCwcmqXUhRaUr96IZ4aj6KIAO7KLnwXZZLtPit0B20573Q3FIB9kKnVkNB8g0GZRB1JOGb2w75fh6hRrM4Hmzj1C+gJqgYD9onN5UEWRJJxJaiUOrgfOrPxGqMMByz8DzZcOhMivXru9jw7LttHmwkk/0KEZVkSkZaQBYk4i56FHrA0k+C8bEOfzBumnKaPw1TA0RWjQFsVfv9dhcOnrzcVOr0kEnF5eI7LG4JQfpKwDKjkBxMP/2URU9ECOrgdXnt/Do+ZaUVCX9TMBKoxAQKBgQD80I2IK3XkOG6WCHQSsNbJW0Ggli3r5LIPfKiQkE3OhBF2IRa5N1J+wU1uBqEsyMfbCcjNs+9GRMZWm0mHvxxgrM9mUjN+30HP9Z73MF/6GoEfm48TtBau5dZJAIwHOLOIUR2bqFDnlz7iBBrvEHvPMbSSTjRHlF+Py/DUMv6EawKBgQD8m5BZkvb9QGOpov8n9hMAverl05P1inIH5mfRe05yuKH85kBvqUpVXjBvdcLJRYSEUDPEn9jGkaWbXSWT+zmI+YMRUIzkw0dWMSJ64rfi0ajKIfPGpQgb6s9SvuQCG8dtHh9J5CZxzhx2H+q1l6H+RiK/FTMl9NiyKHLt3DK/AQKBgHUMAVrX9D7zOY/Q3hyBLxAOZfX5Uc1zFlVBO7GifcNtNcBhVWnvCQySZkzYWOqpEo6Amy1RbygzUzhpsMNeYb8IgwU2bY0BxDCJ4U1EYksi1kFR/g37RL04v9sQm8QEJmqoU3LrnHl8dqqhh+7CzO+Cbb2G44F4Wj3zB87WxSt9AoGBAKAWAlQSBD8Y2FBAQQ3VL9PPiBbgkCsS8xM4nGCwkVW41sfML9fT5IzXZUCt06T0Tnf/z97zIlEtKlOco1z14E+DOOH3N2Meso3YE67nEXxIPHzlKXWhTtNKattYqG0Bp8/qQA/267pB0d22emtczkezsP+B8ulCEzZM1hER9IMBAoGAaqfLxqPd5guFHho/QclRtkqbT16cGLDlxI9WmGS6X8N5RafGEgsQZp2GzRCA4Nnipda+8gDTxrCs07X9igd1qtFSAI1rBckWp07qvC3SNP0KmDXzZHU05Edu9e+JzheJlDWZ1v0ye88yZ1dZN4WNJN1s8p+rA13H9jrEzZaLjQQ=','+XbsJYF7BQuDdNzNIV9+t86BRO//IIEHY2fhXayL7iIWWotDu5F8i4+mMmuxJJ0WQ1QmXLR6388LwGSHgZVYJ3yVLAaQNEVHJ+dujc9RcIAWHjE3v0Hjfn8iDlj1JQH/4jWEU9Q7TpvH7GSFFGEprWc/lcEyW9/2m/NvjxabWp4/r+R/AZ1TLK0zRHMpk/UHX7ZAmfnCBH/6VYEt4xFS8w3jmiz1yE2Iu5tWbrM2DebKN4AFiz6A9gQF6hvWa8kKVvzW7C2IV2XIaHM6n8jWHUBPJ8Ej5CmaU1tQXSod5xfsuRIZUxMfB2Icu+1WPfixUKYNNeVOUrvBDy9w6LBZaw==','AQAB');

/*Table structure for table `policy` */

DROP TABLE IF EXISTS `policy`;

CREATE TABLE `policy` (
  `policy_id` int(11) NOT NULL AUTO_INCREMENT,
  `policy_reuse_flag` int(11) DEFAULT NULL,
  `policy_expiration_time` int(11) DEFAULT NULL,
  `policy_desc` varchar(50) DEFAULT NULL,
  `policy_type` int(11) DEFAULT NULL,
  `default_assign_flag` int(11) DEFAULT NULL,
  PRIMARY KEY (`policy_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

/*Data for the table `policy` */

insert  into `policy`(policy_id,policy_reuse_flag,policy_expiration_time,policy_desc,policy_type,default_assign_flag) values (-1,0,0,'tset@123WERt!',0,0),(0,0,0,'default_policy',0,0);

/*Table structure for table `policy_mapping` */

DROP TABLE IF EXISTS `policy_mapping`;

CREATE TABLE `policy_mapping` (
  `policy_mapping_id` int(11) NOT NULL AUTO_INCREMENT,
  `domain_id` int(11) DEFAULT NULL,
  `application_id` int(11) DEFAULT NULL,
  `policy_id` int(11) DEFAULT NULL,
  `use_flag` int(11) DEFAULT NULL,
  `hardToken_offline_authentication_policy_id` int(11) DEFAULT NULL,
  `lock_out_attempt_duration_policy_id` int(11) DEFAULT NULL,
  `emergency_authentication_policy_id` int(11) DEFAULT NULL,
  `token_activation_policy_id` int(11) DEFAULT NULL,
  `network_time_policy_id` int(11) DEFAULT NULL,
  `country_policy_id` int(11) DEFAULT NULL,
  `token_revalidation_policy_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`policy_mapping_id`),
  KEY `FK_policy_mapping_policy` (`policy_id`),
  KEY `FK_policy_mapping_domain` (`domain_id`),
  KEY `FK_policy_mapping_hardOffline` (`hardToken_offline_authentication_policy_id`),
  KEY `FK_policy_mapping_lockout` (`lock_out_attempt_duration_policy_id`),
  KEY `FK_policy_mapping_emergency_policy_id` (`emergency_authentication_policy_id`),
  CONSTRAINT `FK_policy_mapping_policy` FOREIGN KEY (`policy_id`) REFERENCES `policy` (`policy_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=475 DEFAULT CHARSET=latin1;

/*Data for the table `policy_mapping` */

insert  into `policy_mapping`(policy_mapping_id,domain_id,application_id,policy_id,use_flag,hardToken_offline_authentication_policy_id,lock_out_attempt_duration_policy_id,emergency_authentication_policy_id,token_activation_policy_id,network_time_policy_id,country_policy_id,token_revalidation_policy_id) values (151,0,-1,0,1,-1,-1,-1,-1,-1,-1,-1),(192,0,-1,-1,1,0,-1,-1,-1,-1,-1,-1),(282,0,-1,-1,1,-1,0,-1,-1,-1,-1,-1),(310,0,-1,-1,1,-1,-1,0,-1,-1,-1,-1),(313,0,-1,-1,1,-1,-1,-1,0,-1,-1,-1),(314,0,-1,-1,1,-1,-1,-1,-1,0,-1,-1),(317,0,-1,-1,1,-1,-1,-1,-1,-1,0,-1),(474,0,-1,-1,1,-1,-1,-1,-1,-1,-1,0);

/*Table structure for table `properties` */

DROP TABLE IF EXISTS `properties`;

CREATE TABLE `properties` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `connection_host` varchar(50) DEFAULT NULL,
  `qr_host` varchar(50) DEFAULT NULL,
  `qr_host_port` varchar(7) DEFAULT NULL,
  `openfire_localhost_ip` varchar(50) DEFAULT NULL,
  `xmpp_server_ip` varchar(50) DEFAULT NULL,
  `xmpp_server_port` varchar(7) DEFAULT NULL,
  `xmpp_server_qr_ip` varchar(50) DEFAULT NULL,
  `xmpp_server_qr_port` varchar(7) DEFAULT NULL,
  `xmpp_server_user` varchar(25) DEFAULT NULL,
  `xmpp_server_password` varchar(25) DEFAULT NULL,
  `secure_flag` int(11) DEFAULT NULL,
  `smsUtil_sourceAddr` varchar(15) DEFAULT NULL,
  `bindParameter_systemId` varchar(15) DEFAULT NULL,
  `bindParameter_password` varchar(25) DEFAULT NULL,
  `bindParameter_systemType` varchar(15) DEFAULT NULL,
  `mail_transport_protocol` varchar(7) DEFAULT NULL,
  `mail_smtp_host` varchar(50) DEFAULT NULL,
  `email_server_type` varchar(7) DEFAULT NULL,
  `mail_smtp_port` varchar(7) DEFAULT NULL,
  `mail_smtp_auth` varchar(7) DEFAULT NULL,
  `server_ip` varchar(50) DEFAULT NULL,
  `user_login` varchar(100) DEFAULT NULL,
  `sender_email` varchar(30) DEFAULT NULL,
  `sender_password` varchar(25) DEFAULT NULL,
  `mail_smtp_socketFactory_port` varchar(7) DEFAULT NULL,
  `protocal_type` varchar(60) DEFAULT NULL,
  `superadmin_admin_mails` varchar(100) DEFAULT NULL,
  `mail_user_name` varchar(100) DEFAULT NULL,
  `mime_type` varchar(100) DEFAULT NULL,
  `mobile_ios_path` varchar(100) DEFAULT NULL,
  `mobile_blackberry_path` varchar(100) DEFAULT NULL,
  `mobile_android_path` varchar(100) DEFAULT NULL,
  `mobile_windows_path` varchar(100) DEFAULT NULL,
  `country_policy_notification_schedular_user` varchar(100) DEFAULT NULL,
  `reprovisioning_seed_schedular_notification_day` varchar(100) DEFAULT NULL,
  `reprovisioning_seed_schedular_notification` varchar(100) DEFAULT NULL,
  `update_employeeid_schedular` varchar(100) DEFAULT NULL,
  `verify_ldap_password` varchar(100) DEFAULT NULL,
  `country_policy_expired_alert_interval` varchar(100) DEFAULT NULL,
  `push_server_check_counter` varchar(100) DEFAULT NULL,
  `mysql_server_check_counter` varchar(100) DEFAULT NULL,
  `ntp_server_check_counter` varchar(100) DEFAULT NULL,
  `log_report_schedular` varchar(100) DEFAULT NULL,
  `server_schedular` varchar(100) DEFAULT NULL,
  `database_schedular` varchar(100) DEFAULT NULL,
  `redis_schedular` varchar(100) DEFAULT NULL,
  `reprovisioning_seed_schedular` varchar(100) DEFAULT NULL,
  `country_policy_expired_schedular` varchar(100) DEFAULT NULL,
  `country_policy_expired_schedular_interval` varchar(100) DEFAULT NULL,
  `country_policy_notification_schedular` varchar(100) DEFAULT NULL,
  `country_superadmin_admin_mails` varchar(100) DEFAULT NULL,
  `country_policy_time_interval` varchar(100) DEFAULT NULL,
  `maximum_countries_allowed` varchar(100) DEFAULT NULL,
  `user_country_policy_schedular` varchar(100) DEFAULT NULL,
  `radius_server_check_counter` varchar(100) DEFAULT NULL,
  `redis_server_check_counter` varchar(100) DEFAULT NULL,
  `log_report_days` varchar(100) DEFAULT NULL,
  `dashboard_schedular` varchar(100) DEFAULT NULL,
  `fileRead_schedular` varchar(100) DEFAULT NULL,
  `default_user_country_policy` varchar(100) DEFAULT NULL,
  `default_from_timestamp` varchar(100) DEFAULT NULL,
  `default_to_timestamp` varchar(100) DEFAULT NULL,
  `sms_key_expire_time` varchar(100) DEFAULT NULL,
  `employeeid_attribute` varchar(100) DEFAULT NULL,
  `deny_notification_time_interval` varchar(100) DEFAULT NULL,
  `qrcode_activation_key_expire_time` varchar(100) DEFAULT NULL,
  `allow_device_no` varchar(100) DEFAULT NULL,
  `public_server_ip` varchar(100) DEFAULT NULL,
  `login_auth` varchar(100) DEFAULT NULL,
  `user_secure_organisation` varchar(100) DEFAULT NULL,
  `user_secure_application` varchar(100) DEFAULT NULL,
  `user_domain` varchar(100) DEFAULT NULL,
  `user_secure_domain` varchar(100) DEFAULT NULL,
  `ad_server` varchar(100) DEFAULT NULL,
  `ad_base_dn` varchar(100) DEFAULT NULL,
  `ldap_filter` varchar(100) DEFAULT NULL,
  `ldap_default_domain` varchar(100) DEFAULT NULL,
  `usersearch_admin_name` varchar(100) DEFAULT NULL,
  `usersearch_domain` varchar(100) DEFAULT NULL,
  `ldap_server` varchar(100) DEFAULT NULL,
  `ldap_multidomain_flag` varchar(100) DEFAULT NULL,
  `usersearch_admin_password` varchar(100) DEFAULT NULL,
  `secure_login_ssl_flag` varchar(100) DEFAULT NULL,
  `ldap_multi_server_ip` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `properties` */

insert  into `properties`(id,connection_host,qr_host,qr_host_port,openfire_localhost_ip,xmpp_server_ip,xmpp_server_port,xmpp_server_qr_ip,xmpp_server_qr_port,xmpp_server_user,xmpp_server_password,secure_flag,smsUtil_sourceAddr,bindParameter_systemId,bindParameter_password,bindParameter_systemType,mail_transport_protocol,mail_smtp_host,email_server_type,mail_smtp_port,mail_smtp_auth,server_ip,user_login,sender_email,sender_password,mail_smtp_socketFactory_port,protocal_type,superadmin_admin_mails,mail_user_name,mime_type,mobile_ios_path,mobile_blackberry_path,mobile_android_path,mobile_windows_path,country_policy_notification_schedular_user,reprovisioning_seed_schedular_notification_day,reprovisioning_seed_schedular_notification,update_employeeid_schedular,verify_ldap_password,country_policy_expired_alert_interval,push_server_check_counter,mysql_server_check_counter,ntp_server_check_counter,log_report_schedular,server_schedular,database_schedular,redis_schedular,reprovisioning_seed_schedular,country_policy_expired_schedular,country_policy_expired_schedular_interval,country_policy_notification_schedular,country_superadmin_admin_mails,country_policy_time_interval,maximum_countries_allowed,user_country_policy_schedular,radius_server_check_counter,redis_server_check_counter,log_report_days,dashboard_schedular,fileRead_schedular,default_user_country_policy,default_from_timestamp,default_to_timestamp,sms_key_expire_time,employeeid_attribute,deny_notification_time_interval,qrcode_activation_key_expire_time,allow_device_no,public_server_ip,login_auth,user_secure_organisation,user_secure_application,user_domain,user_secure_domain,ad_server,ad_base_dn,ldap_filter,ldap_default_domain,usersearch_admin_name,usersearch_domain,ldap_server,ldap_multidomain_flag,usersearch_admin_password,secure_login_ssl_flag,ldap_multi_server_ip) values (1,'59.162.167.36','192.168.1.95','80','@172.20.0.55','172.20.0.55','5222','172.20.0.55','5222','admin','Innefu@123',0,'INNEFU','vijaya','vij12','vijaya','smtp','172.20.0.180','SSL','465','true','192.168.1.75','http://192.168.1.75/mfid/user','mail@authshieldserver.com','123456','465','http://localhost:80','abc@gmail.com','testingq23@gmail.com','both','https://itunes.apple.com/us/app/one-touch-authentication/id952525756?mt=8','auth-shield.com/blackberry/AuthShield_Mobile.jad','https://play.google.com/store/search?q=Authshield','http://www.windowsphone.com/en-in/search?q=authshield','0 0 */2 * *','3','3','no','0 */2 * * *','1,24,36,48','2,10','2,10','2,10','05 11 * * *','*/1 * * * *','00 00 * * 07','58 15 * * *','no','*/30 * * * *','30','*/5 * * * *','puneet.vats@innefu.com','30','12','00 12 * * *','2,10','2,10','30','48 16 * * *','25 18 * * *','India','2018-05-09 00:00','2099-05-09 23:59','300','employeeID','1,5,20,100,500','300','1','http://192.168.1.95/mfid/ip.jsp','AD','AuthShield','defaultApp','local','default_domain','192.168.2.58:389','dc=innefu,dc=com','no','innefu.com','uid=zimbra,cn=admins,cn=zimbra','','192.168.1.210:389','true','70SB6hJ2ow3Z1xKilyY8pg==','0','192.168.2.227:389,192.168.2.210:389');

/*Table structure for table `radius_server_credential` */

DROP TABLE IF EXISTS `radius_server_credential`;

CREATE TABLE `radius_server_credential` (
  `radius_server_id` int(11) NOT NULL AUTO_INCREMENT,
  `radius_server_host` varchar(50) DEFAULT NULL,
  `radius_host_secretkey` varchar(100) DEFAULT NULL,
  `appId` int(11) DEFAULT NULL,
  `authentication_source_type` varchar(50) DEFAULT NULL,
  `authentication_source_url` varchar(200) DEFAULT NULL,
  `authentication_source_principle` varchar(200) DEFAULT NULL,
  `authentication_domain` varchar(150) DEFAULT NULL,
  `adfs_url` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`radius_server_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

/*Data for the table `radius_server_credential` */

insert  into `radius_server_credential`(radius_server_id,radius_server_host,radius_host_secretkey,appId,authentication_source_type,authentication_source_url,authentication_source_principle,authentication_domain,adfs_url) values (6,'172.20.0.55','testing',0,'Radius','192.168.1.157',NULL,'testing',NULL);

/*Table structure for table `resync_offset` */

DROP TABLE IF EXISTS `resync_offset`;

CREATE TABLE `resync_offset` (
  `id` int(11) DEFAULT NULL,
  `offset` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `resync_offset` */

insert  into `resync_offset`(id,offset) values (0,0);

/*Table structure for table `role` */

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_description` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Data for the table `role` */

insert  into `role`(role_id,role_description) values (1,'soc'),(2,'superadmin'),(3,'admin'),(4,'manager'),(5,'user'),(6,'report'),(7,'country');

/*Table structure for table `schedular` */

DROP TABLE IF EXISTS `schedular`;

CREATE TABLE `schedular` (
  `schedular_id` int(11) NOT NULL AUTO_INCREMENT,
  `schedular_data` varchar(150) DEFAULT '00 18 * * 7',
  `domain_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`schedular_id`),
  KEY `FK_schedular_domain` (`domain_id`),
  CONSTRAINT `FK_schedular_domain` FOREIGN KEY (`domain_id`) REFERENCES `domain` (`domain_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

/*Data for the table `schedular` */

insert  into `schedular`(schedular_id,schedular_data,domain_id) values (1,'0 0 0 1 1 ? 2099',0);

/*Table structure for table `seed` */

DROP TABLE IF EXISTS `seed`;

CREATE TABLE `seed` (
  `seed_id` int(11) NOT NULL AUTO_INCREMENT,
  `seed` varchar(750) DEFAULT NULL,
  `seed_offset` int(11) DEFAULT NULL,
  `seed_active_status` int(11) DEFAULT '0',
  `seed_auth_code` varchar(20) DEFAULT NULL,
  `domain_id` int(11) DEFAULT NULL,
  `seed_type` varchar(20) DEFAULT NULL,
  `available_flag` int(11) DEFAULT NULL,
  `deassociate_status` int(11) DEFAULT NULL,
  `last_otp` varchar(100) DEFAULT '000000',
  `second_last_otp` varchar(100) DEFAULT '000000',
  `error_counter` int(11) DEFAULT NULL,
  `expiry_time` timestamp NULL DEFAULT NULL,
  `last_resync_date` timestamp NULL DEFAULT NULL,
  `lock_reason` varchar(200) DEFAULT NULL,
  `lock_date` timestamp NULL DEFAULT NULL,
  `resync_counter` int(11) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `last_otp_updation_time` timestamp NULL DEFAULT '2014-01-01 21:51:08',
  `start_time` bigint(20) DEFAULT NULL,
  `license_key` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`seed_id`),
  UNIQUE KEY `uk_seed` (`seed`),
  UNIQUE KEY `UK_e0lp8b8i36qcr4s470var5rru` (`seed`),
  KEY `FK_seed_fk` (`domain_id`),
  CONSTRAINT `FK_seed_fk` FOREIGN KEY (`domain_id`) REFERENCES `domain` (`domain_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=104881 DEFAULT CHARSET=latin1;

/*Data for the table `seed` */

insert  into `seed`(seed_id,seed,seed_offset,seed_active_status,seed_auth_code,domain_id,seed_type,available_flag,deassociate_status,last_otp,second_last_otp,error_counter,expiry_time,last_resync_date,lock_reason,lock_date,resync_counter,description,last_otp_updation_time,start_time,license_key) values (0,'fdvbfgbgfbngf',0,0,'dfdsf',0,'free',0,0,'000000','000000',1,'2014-01-01 21:51:08','2014-01-01 21:51:08','','2014-01-01 21:51:08',0,'dscsdfd','2014-01-01 21:51:08',0,'m');

/*Table structure for table `seed_key` */

DROP TABLE IF EXISTS `seed_key`;

CREATE TABLE `seed_key` (
  `key_id` int(11) NOT NULL AUTO_INCREMENT,
  `key_modulus` varchar(2000) DEFAULT NULL,
  `key_exponent` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`key_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `seed_key` */

insert  into `seed_key`(key_id,key_modulus,key_exponent) values (1,'24201529642737126482678671261651784233757001246260332727942398047752496581418331597024887268211769500452214271508767656684110092461668087226127924249399023310738329906307061220064849601265564044357722677642337546149560762293910094919095332670382530267421519773870920758003973763131186334354373026241283157072533648612518145569537842689644284419352439393848639856409277521730372599026181666941776683650029380523979327098748494026729270362178996744427724049443866990957327023356686830351709366748833049197993252065464259581403369016278679486556426664813720020083186564825348354542159202434403638938132382054962701389759','7504885590267278354326237637526118238287433607393514229061039649731815432872495735940564626880507065591808453848554024242659404749965371266560840510254304450068435825348709968039091481857882693340891373998279230822245805760091778064921715151138809567493286942709900095593554157012299920244807101519776578134164580376485683792281909418947288574230415696899120593613625365307158700652379115219143428530852162969517766990542764592350274467164295474747982185653524867712375699239985034889439266108657427634420682790651208007708577467237089376030347774550966193821783593290756105063201149579704117035662932761083411211889');

/*Table structure for table `self_enrollment_logs` */

DROP TABLE IF EXISTS `self_enrollment_logs`;

CREATE TABLE `self_enrollment_logs` (
  `self_enrollment_logs_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_logon_id` varchar(350) DEFAULT NULL,
  `domain_name` varchar(30) DEFAULT NULL,
  `app_name` varchar(30) DEFAULT NULL,
  `activity` text,
  `activity_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `manager_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`self_enrollment_logs_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Data for the table `self_enrollment_logs` */

/*Table structure for table `system_tiles` */

DROP TABLE IF EXISTS `system_tiles`;

CREATE TABLE `system_tiles` (
  `system_id` int(10) NOT NULL AUTO_INCREMENT,
  `system_name` varchar(100) NOT NULL,
  `Password` int(2) DEFAULT NULL,
  `Bio` int(2) DEFAULT NULL,
  `Push` int(2) DEFAULT NULL,
  `OTP` int(2) DEFAULT NULL,
  `created_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`system_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `system_tiles` */

/*Table structure for table `tiles_type_master` */

DROP TABLE IF EXISTS `tiles_type_master`;

CREATE TABLE `tiles_type_master` (
  `tiles_type_id` int(5) NOT NULL AUTO_INCREMENT,
  `tiles_type` varchar(50) NOT NULL,
  PRIMARY KEY (`tiles_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Data for the table `tiles_type_master` */

insert  into `tiles_type_master`(tiles_type_id,tiles_type) values (1,'Password'),(2,'Bio'),(3,'Push'),(4,'OTP');

/*Table structure for table `token` */

DROP TABLE IF EXISTS `token`;

CREATE TABLE `token` (
  `token_id` int(11) NOT NULL AUTO_INCREMENT,
  `token_serial` varchar(80) DEFAULT NULL,
  `start_time` timestamp NULL DEFAULT NULL,
  `active_status` int(11) DEFAULT NULL,
  `last_otp` varchar(100) NOT NULL DEFAULT '000000',
  `second_last_otp` varchar(100) NOT NULL DEFAULT '000000',
  `activated_by` varchar(80) DEFAULT NULL,
  `error_counter` int(11) DEFAULT NULL,
  `expiry_time` timestamp NULL DEFAULT NULL,
  `last_resync_date` timestamp NULL DEFAULT NULL,
  `lock_reason` varchar(200) DEFAULT NULL,
  `lock_date` timestamp NULL DEFAULT NULL,
  `resync_counter` int(11) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `last_otp_updation_time` timestamp NULL DEFAULT '2013-01-01 21:51:08',
  `deassociate_status` int(11) DEFAULT NULL,
  `domain_id` int(11) DEFAULT NULL,
  `token_type` varchar(20) DEFAULT NULL,
  `avilable_flag` int(11) DEFAULT NULL,
  `auth_code` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`token_id`),
  KEY `FK_token_domain` (`domain_id`),
  CONSTRAINT `FK_token` FOREIGN KEY (`domain_id`) REFERENCES `domain` (`domain_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `token` */

insert  into `token`(token_id,token_serial,start_time,active_status,last_otp,second_last_otp,activated_by,error_counter,expiry_time,last_resync_date,lock_reason,lock_date,resync_counter,description,last_otp_updation_time,deassociate_status,domain_id,token_type,avilable_flag,auth_code) values (0,'N/A',NULL,0,'eX5eHRWwZ2E=','kbVi+/k0zKs=','admin',0,'2013-01-22 11:43:33','2013-01-22 11:43:33','','2013-01-22 11:43:33',0,'dsd','2014-04-24 10:44:17',0,0,'free',0,NULL);

/*Table structure for table `token_activation_policy` */

DROP TABLE IF EXISTS `token_activation_policy`;

CREATE TABLE `token_activation_policy` (
  `token_activation_policy_id` int(11) NOT NULL AUTO_INCREMENT,
  `token_activation_policy_desc` varchar(100) DEFAULT NULL,
  `number_of_days` int(11) DEFAULT NULL,
  `default_assign_flag` int(11) DEFAULT NULL,
  PRIMARY KEY (`token_activation_policy_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `token_activation_policy` */

insert  into `token_activation_policy`(token_activation_policy_id,token_activation_policy_desc,number_of_days,default_assign_flag) values (0,'default_policy',0,0);

/*Table structure for table `token_detail_dashbord` */

DROP TABLE IF EXISTS `token_detail_dashbord`;

CREATE TABLE `token_detail_dashbord` (
  `token_detail_dashboard_id` int(11) NOT NULL AUTO_INCREMENT,
  `freeHardToken` int(11) DEFAULT NULL,
  `freeMobileToken` int(11) DEFAULT NULL,
  `freeBioToken` int(11) DEFAULT NULL,
  `freePushToken` int(11) DEFAULT NULL,
  `usedHardToken` int(11) DEFAULT NULL,
  `usedMobileToken` int(11) DEFAULT NULL,
  `usedBioToken` int(11) DEFAULT NULL,
  `usedPushToken` int(11) DEFAULT NULL,
  `domain` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`token_detail_dashboard_id`)
) ENGINE=InnoDB AUTO_INCREMENT=156 DEFAULT CHARSET=latin1;

/*Data for the table `token_detail_dashbord` */

insert  into `token_detail_dashbord`(token_detail_dashboard_id,freeHardToken,freeMobileToken,freeBioToken,freePushToken,usedHardToken,usedMobileToken,usedBioToken,usedPushToken,domain) values (155,0,0,0,0,0,0,0,0,'default_domain');

/*Table structure for table `token_limit` */

DROP TABLE IF EXISTS `token_limit`;

CREATE TABLE `token_limit` (
  `token_limit_id` int(11) NOT NULL AUTO_INCREMENT,
  `hard_token_limit` int(11) DEFAULT '0',
  `bio_token_limit` int(11) DEFAULT '0',
  `mobile_token_limit` int(11) DEFAULT '0',
  `sms_token_limit` int(11) DEFAULT '0',
  `push_token_limit` int(11) DEFAULT '0',
  `u2f_token_limit` int(11) DEFAULT NULL,
  PRIMARY KEY (`token_limit_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

/*Data for the table `token_limit` */

insert  into `token_limit`(token_limit_id,hard_token_limit,bio_token_limit,mobile_token_limit,sms_token_limit,push_token_limit,u2f_token_limit) values (0,0,0,0,0,0,0),(1,2000,2000,2000,2000,2000,2000);

/*Table structure for table `token_revalidation_policy` */

DROP TABLE IF EXISTS `token_revalidation_policy`;

CREATE TABLE `token_revalidation_policy` (
  `token_revalidation_policy_id` int(11) NOT NULL AUTO_INCREMENT,
  `token_revalidation_policy_desc` varchar(100) DEFAULT NULL,
  `number_of_days` int(11) DEFAULT NULL,
  `default_assign_flag` int(11) DEFAULT NULL,
  PRIMARY KEY (`token_revalidation_policy_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `token_revalidation_policy` */

insert  into `token_revalidation_policy`(token_revalidation_policy_id,token_revalidation_policy_desc,number_of_days,default_assign_flag) values (0,'default_policy',9999,0);

/*Table structure for table `token_stock_dashboard` */

DROP TABLE IF EXISTS `token_stock_dashboard`;

CREATE TABLE `token_stock_dashboard` (
  `token_stock_dashboard_id` int(11) NOT NULL AUTO_INCREMENT,
  `total_hard_tokens` int(11) DEFAULT NULL,
  `total_mobile_tokens` int(11) DEFAULT NULL,
  `total_soft_tokens` int(11) DEFAULT NULL,
  `total_push_token` int(11) DEFAULT NULL,
  `domain` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`token_stock_dashboard_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `token_stock_dashboard` */

/*Table structure for table `top_unsuccessful_attempts_user_dashboard` */

DROP TABLE IF EXISTS `top_unsuccessful_attempts_user_dashboard`;

CREATE TABLE `top_unsuccessful_attempts_user_dashboard` (
  `top_unsuccessful_attempts_user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_logon_id` varchar(350) DEFAULT NULL,
  `unsuccessful_attempts_count` int(11) DEFAULT NULL,
  `domain` varchar(30) DEFAULT NULL,
  `insert_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`top_unsuccessful_attempts_user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;

/*Data for the table `top_unsuccessful_attempts_user_dashboard` */

/*Table structure for table `transaction_app` */

DROP TABLE IF EXISTS `transaction_app`;

CREATE TABLE `transaction_app` (
  `transaction_id` int(11) NOT NULL AUTO_INCREMENT,
  `app_id` int(11) DEFAULT NULL,
  `app_type` varchar(20) DEFAULT NULL,
  `transaction_1` varchar(50) DEFAULT NULL,
  `transaction_2` varchar(50) DEFAULT NULL,
  `transaction_3` varchar(50) DEFAULT NULL,
  `transaction_4` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`transaction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `transaction_app` */

/*Table structure for table `transaction_details` */

DROP TABLE IF EXISTS `transaction_details`;

CREATE TABLE `transaction_details` (
  `transaction_details_id` int(11) NOT NULL AUTO_INCREMENT,
  `otp_entered` varchar(50) DEFAULT NULL,
  `match_time_stamp_start` decimal(17,3) DEFAULT NULL,
  `match_time_stamp_end` decimal(17,3) DEFAULT NULL,
  `status_id` int(11) DEFAULT NULL,
  `otp_details_id` int(11) DEFAULT NULL,
  `match_flag` int(11) DEFAULT '1',
  `user_id` int(11) DEFAULT NULL,
  `user_mapping_id` int(11) DEFAULT NULL,
  `ip_address` varchar(100) DEFAULT NULL,
  `authentication_mode` enum('offline','online','e_online','e_offline') DEFAULT NULL,
  `country_code` varchar(6) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`transaction_details_id`),
  KEY `FK_transaction_details_user` (`user_id`),
  KEY `FK_transaction_details_otp_detail` (`otp_details_id`),
  KEY `FK_transaction_details_status` (`status_id`),
  KEY `FK_transaction_details_user_mapping` (`user_mapping_id`),
  CONSTRAINT `FK_transaction_details_otp_details` FOREIGN KEY (`otp_details_id`) REFERENCES `otp_details` (`otp_details_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_transaction_details_status` FOREIGN KEY (`status_id`) REFERENCES `transaction_status` (`status_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_transaction_details_user` FOREIGN KEY (`user_id`) REFERENCES `user_detail` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_transaction_details_user_mapping` FOREIGN KEY (`user_mapping_id`) REFERENCES `user_mapping` (`user_mapping_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `transaction_details` */

/*Table structure for table `transaction_status` */

DROP TABLE IF EXISTS `transaction_status`;

CREATE TABLE `transaction_status` (
  `status_id` int(11) NOT NULL AUTO_INCREMENT,
  `status_desc` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1 CHECKSUM=1 DELAY_KEY_WRITE=1 ROW_FORMAT=DYNAMIC;

/*Data for the table `transaction_status` */

insert  into `transaction_status`(status_id,status_desc) values (1,'Not matched'),(2,'Inactive Token'),(3,'Inactive User'),(4,'OTP already used'),(5,'Attempts Exceeded'),(6,'Success'),(7,'Last IP not matched'),(8,'License has not been issued to user'),(9,'No token associated ..Please contact administrator'),(10,'Token is locked'),(11,'User is locked by admin. Contact adminstrator'),(12,'Username is empty'),(13,'Please enter Combination of pin and OTP'),(14,'Incorrect pin'),(15,'Please enter radius credentials.'),(16,'Accept'),(17,'Deny'),(18,'Not Responding'),(19,'Invalid Access');

/*Table structure for table `udid` */

DROP TABLE IF EXISTS `udid`;

CREATE TABLE `udid` (
  `udid_id` int(11) NOT NULL AUTO_INCREMENT,
  `udid_mac` varchar(25) DEFAULT NULL,
  `udid_private_key` text,
  PRIMARY KEY (`udid_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

/*Data for the table `udid` */

/*Table structure for table `user_attempts` */

DROP TABLE IF EXISTS `user_attempts`;

CREATE TABLE `user_attempts` (
  `user_attempts_id` int(11) NOT NULL AUTO_INCREMENT,
  `success` int(11) DEFAULT NULL,
  `user_locked` int(11) DEFAULT NULL,
  `otp_incorrect` int(11) DEFAULT NULL,
  `token_locked` int(11) DEFAULT NULL,
  `otp_already_used` int(11) DEFAULT NULL,
  `other` int(11) DEFAULT NULL,
  `domain_name` varchar(50) DEFAULT NULL,
  `insert_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_attempts_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

/*Data for the table `user_attempts` */

/*Table structure for table `user_country_log` */

DROP TABLE IF EXISTS `user_country_log`;

CREATE TABLE `user_country_log` (
  `user_country_log_id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_logon_id` varchar(350) DEFAULT NULL,
  `domain_id` varchar(30) DEFAULT NULL,
  `app_id` varchar(30) DEFAULT NULL,
  `activity_time` timestamp NULL DEFAULT NULL,
  `allowed_countries` text,
  `activity` text,
  `activity_type` varchar(30) DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_country_log_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `user_country_log` */

/*Table structure for table `user_country_mapping` */

DROP TABLE IF EXISTS `user_country_mapping`;

CREATE TABLE `user_country_mapping` (
  `user_country_mapping_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `from_timestamp` varchar(25) DEFAULT NULL,
  `end_timestamp` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`user_country_mapping_id`),
  UNIQUE KEY `ucm_ck_c_ft_et` (`user_id`,`country`,`from_timestamp`,`end_timestamp`),
  KEY `FK_user_country_mapping_ucp` (`user_id`),
  CONSTRAINT `FK_user_country_mapping_ucp` FOREIGN KEY (`user_id`) REFERENCES `user_detail` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;

/*Data for the table `user_country_mapping` */

insert  into `user_country_mapping`(user_country_mapping_id,user_id,country,from_timestamp,end_timestamp) values (1,1,'India','2017-05-09 00:00','2099-05-09 23:59');

/*Table structure for table `user_detail` */

DROP TABLE IF EXISTS `user_detail`;

CREATE TABLE `user_detail` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_logon_id` varchar(350) DEFAULT NULL,
  `first_name` varchar(80) DEFAULT NULL,
  `middle_name` varchar(80) DEFAULT NULL,
  `last_name` varchar(80) DEFAULT NULL,
  `email_id` tinytext,
  `mobile_number` varchar(50) DEFAULT NULL,
  `domain_id` int(11) DEFAULT NULL,
  `password` varchar(400) DEFAULT '123456',
  `last_file_date` timestamp NULL DEFAULT '2013-09-09 11:22:00',
  `row_hashed` varchar(150) DEFAULT NULL,
  `role_flag` int(11) DEFAULT '0',
  `first_login_flag` int(11) DEFAULT '0',
  `password_flag` int(11) DEFAULT '0',
  `emp_id` varchar(50) DEFAULT NULL,
  `ad_domain_name` varchar(50) DEFAULT NULL,
  `failure_count` int(11) DEFAULT NULL,
  `session_id` varchar(40) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_logon_id_domain` (`user_logon_id`,`domain_id`),
  UNIQUE KEY `UK_dcfnaxpg1ywh282xlu9sspqtn` (`user_logon_id`,`domain_id`),
  KEY `FK_user_domain` (`domain_id`),
  CONSTRAINT `FK_user_domain` FOREIGN KEY (`domain_id`) REFERENCES `domain` (`domain_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

/*Data for the table `user_detail` */

insert  into `user_detail`(user_id,user_logon_id,first_name,middle_name,last_name,email_id,mobile_number,domain_id,password,last_file_date,row_hashed,role_flag,first_login_flag,password_flag,emp_id,ad_domain_name,failure_count,session_id) values (1,'userMfid','shyam','user','gupta','shyam.gupta1@innefu.com','8287091465',0,'a5a7f5f23de42a0a0e5896cb7b4cb47a397c41dc09f3851232cfa426669002d97abc20915f6473c577d8c8b0df2ccc835146d0ab3962c6f9604097e17b83cd82','2013-09-09 11:22:00','3ae88f6245ad247822eb8018a0ae5bd7',0,0,0,NULL,'local',0,NULL);

/*Table structure for table `user_detail_sync` */

DROP TABLE IF EXISTS `user_detail_sync`;

CREATE TABLE `user_detail_sync` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_logon_id` varchar(350) DEFAULT NULL,
  `first_name` varchar(80) DEFAULT NULL,
  `middle_name` varchar(80) DEFAULT NULL,
  `last_name` varchar(80) DEFAULT NULL,
  `email_id` varchar(100) DEFAULT NULL,
  `mobile_number` varchar(50) DEFAULT NULL,
  `domain_id` int(11) DEFAULT NULL,
  `row_hashed` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uc_userlogonid` (`user_logon_id`),
  UNIQUE KEY `UK_i1t5h0keq94sa7wm4536ckuhs` (`user_logon_id`),
  KEY `FK_user_domain` (`domain_id`),
  CONSTRAINT `FK_user_detail_sync_domain` FOREIGN KEY (`domain_id`) REFERENCES `domain` (`domain_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6082 DEFAULT CHARSET=latin1;

/*Data for the table `user_detail_sync` */

/*Table structure for table `user_mapping` */

DROP TABLE IF EXISTS `user_mapping`;

CREATE TABLE `user_mapping` (
  `user_mapping_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `application_id` int(11) DEFAULT NULL,
  `authentication_type_id` int(11) DEFAULT NULL,
  `token_id` int(11) DEFAULT NULL,
  `policy_flag` int(11) DEFAULT NULL,
  `last_authentication` int(11) DEFAULT NULL,
  `otp_details_id` int(11) NOT NULL DEFAULT '0',
  `lock_out_attempt_duration_policy_id` int(11) DEFAULT NULL,
  `emergency_authentication_policy_id` int(11) DEFAULT NULL,
  `hardToken_offline_authentication_policy_id` int(11) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `user_status` int(11) DEFAULT NULL,
  `last_login` varchar(35) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `description_date` decimal(17,3) DEFAULT NULL,
  `license_detail_id` int(11) DEFAULT NULL,
  `ip_detail_id` int(11) DEFAULT NULL,
  `emergency_type` varchar(11) DEFAULT 'dump',
  `seed_id` int(11) DEFAULT NULL,
  `pin_check_policy_id` int(11) DEFAULT NULL,
  `policy_id` int(11) DEFAULT NULL,
  `token_activation_flag` int(11) DEFAULT '0',
  `token_activation_time` timestamp NULL DEFAULT NULL,
  `token_activation_policy_id` int(11) DEFAULT NULL,
  `license_last_accept_time` timestamp NULL DEFAULT NULL,
  `network_time_policy_id` int(11) DEFAULT NULL,
  `common_policy_user_flag` int(11) DEFAULT '0',
  `common_policy_auth_flag` int(11) DEFAULT '0',
  `offline_policy_user_flag` int(11) DEFAULT '0',
  `emergency_policy_user_flag` int(11) DEFAULT '0',
  `token_activation_policy_user_flag` int(11) DEFAULT '0',
  `lockout_attempt_policy_user_flag` int(11) DEFAULT '0',
  `network_time_policy_user_flag` int(11) DEFAULT '0',
  `last_otp` varchar(50) DEFAULT '000000',
  `second_last_otp` varchar(50) DEFAULT '000000',
  `error_counter` int(11) DEFAULT '0',
  `last_otp_updation_time` timestamp NULL DEFAULT NULL,
  `country_policy_id` int(11) DEFAULT NULL,
  `country_policy_user_flag` int(11) DEFAULT '0',
  `device_decision` text,
  `token_revalidation_policy_id` int(11) DEFAULT NULL,
  `token_revalidation_policy_user_flag` int(11) DEFAULT '0',
  `token_assign_time` timestamp NULL DEFAULT NULL,
  `activation_key` varchar(100) DEFAULT NULL,
  `sms_key` varchar(100) DEFAULT NULL,
  `activation_time` timestamp NULL DEFAULT NULL,
  `sms_otp` varchar(100) DEFAULT NULL,
  `sms_otp_generation_time` timestamp NULL DEFAULT NULL,
  `auth_source_id` int(5) DEFAULT NULL,
  `mobile_app_uptodate_policy` int(2) DEFAULT '0',
  `mobile_app_uptodate_policy_user_flag` int(2) DEFAULT '0',
  `full_disk_encryption_policy` int(2) DEFAULT '0',
  `full_disk_encryption_policy_user_flag` int(2) DEFAULT '0',
  `screen_lock_policy` int(2) DEFAULT '0',
  `screen_lock_policy_user_flag` int(2) DEFAULT '0',
  `device_not_rooted_policy` int(2) DEFAULT '0',
  `device_not_rooted_policy_user_flag` int(2) DEFAULT '0',
  `passes_google_safety_policy` int(2) DEFAULT '0',
  `passes_google_safety_policy_user_flag` int(2) DEFAULT '0',
  `finger_print_policy` int(2) DEFAULT '0',
  `finger_print_policy_user_flag` int(2) DEFAULT '0',
  `touch_or_face_id_policy` int(2) DEFAULT '0',
  `touch_or_face_id_policy_user_flag` int(2) DEFAULT '0',
  `block_android_os_policy` int(11) DEFAULT '0',
  `block_android_os_policy_flag` int(2) DEFAULT '0',
  `block_iphone_os_policy` int(11) DEFAULT '0',
  `block_iphone_os_policy_flag` int(2) DEFAULT '0',
  `notify_android_os_policy` int(11) DEFAULT '0',
  `notify_android_os_policy_flag` int(2) DEFAULT '0',
  `notify_iphone_os_policy` int(11) DEFAULT '0',
  `notify_iphone_os_policy_flag` int(2) DEFAULT '0',
  `pin_sms_otp` varchar(8) DEFAULT NULL,
  `pin_sms_otp_time` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`user_mapping_id`),
  UNIQUE KEY `user_id` (`user_id`,`application_id`),
  UNIQUE KEY `UK_a9k7ou443y3ka25k8t5sla6p0` (`user_id`,`application_id`),
  KEY `FK_user_mapping` (`user_id`),
  KEY `FK_user_mapping_application` (`application_id`),
  KEY `FK_user_mapping_token` (`token_id`),
  KEY `FK_user_mapping_authentication` (`authentication_type_id`),
  KEY `FK_user_mapping_authentication_status` (`last_authentication`),
  KEY `FK_user_mapping_otp_details` (`otp_details_id`),
  KEY `FK_user_mapping_emergency_token` (`emergency_authentication_policy_id`),
  KEY `FK_user_mapping_lock_out` (`lock_out_attempt_duration_policy_id`),
  KEY `FK_user_mapping_role` (`role_id`),
  KEY `FK_user_mapping_fk` (`license_detail_id`),
  KEY `FK_user_mapping_ip_detail` (`ip_detail_id`),
  KEY `FK_user_mapping_seed` (`seed_id`),
  KEY `FK_user_mapping_pincheck` (`pin_check_policy_id`),
  KEY `FK_user_mapping_policy` (`policy_id`),
  KEY `FK_user_mapping_hardOffline` (`hardToken_offline_authentication_policy_id`),
  KEY `FK_user_mapping_tafk` (`token_activation_policy_id`),
  KEY `FK_user_mapping_fk_ntp` (`network_time_policy_id`),
  KEY `FK_user_mapping_countrypolicy` (`country_policy_id`),
  KEY `FK_user_mapping_tr` (`token_revalidation_policy_id`),
  CONSTRAINT `FK_user_mapping_application` FOREIGN KEY (`application_id`) REFERENCES `application` (`application_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_user_mapping_authentication` FOREIGN KEY (`authentication_type_id`) REFERENCES `authentication_type` (`authentication_type_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_user_mapping_countrypolicy` FOREIGN KEY (`country_policy_id`) REFERENCES `country_policy` (`country_policy_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_user_mapping_emergency_token` FOREIGN KEY (`emergency_authentication_policy_id`) REFERENCES `emergency_authentication_policy` (`emergency_authentication_policy_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_user_mapping_fk` FOREIGN KEY (`license_detail_id`) REFERENCES `license_detail` (`license_detail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_user_mapping_fk_ntp` FOREIGN KEY (`network_time_policy_id`) REFERENCES `network_time_policy` (`network_time_policy_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_user_mapping_hardOffline` FOREIGN KEY (`hardToken_offline_authentication_policy_id`) REFERENCES `hardtoken_offline_authentication_policy` (`hardToken_offline_authentication_policy_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_user_mapping_ip_detail` FOREIGN KEY (`ip_detail_id`) REFERENCES `ip_detail` (`ip_detail_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_user_mapping_lock_out` FOREIGN KEY (`lock_out_attempt_duration_policy_id`) REFERENCES `lock_out_attempt_duration_policy` (`lock_out_attempt_duration_policy_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_user_mapping_otp_details` FOREIGN KEY (`otp_details_id`) REFERENCES `otp_details` (`otp_details_id`),
  CONSTRAINT `FK_user_mapping_pincheck` FOREIGN KEY (`pin_check_policy_id`) REFERENCES `pin_check_policy` (`pin_check_policy_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_user_mapping_policy` FOREIGN KEY (`policy_id`) REFERENCES `policy` (`policy_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_user_mapping_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_user_mapping_seed` FOREIGN KEY (`seed_id`) REFERENCES `seed` (`seed_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_user_mapping_tafk` FOREIGN KEY (`token_activation_policy_id`) REFERENCES `token_activation_policy` (`token_activation_policy_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_user_mapping_token` FOREIGN KEY (`token_id`) REFERENCES `token` (`token_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_user_mapping_tr` FOREIGN KEY (`token_revalidation_policy_id`) REFERENCES `token_revalidation_policy` (`token_revalidation_policy_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_user_mapping_user` FOREIGN KEY (`user_id`) REFERENCES `user_detail` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `user_mapping` */

insert  into `user_mapping`(user_mapping_id,user_id,application_id,authentication_type_id,token_id,policy_flag,last_authentication,otp_details_id,lock_out_attempt_duration_policy_id,emergency_authentication_policy_id,hardToken_offline_authentication_policy_id,role_id,user_status,last_login,description,description_date,license_detail_id,ip_detail_id,emergency_type,seed_id,pin_check_policy_id,policy_id,token_activation_flag,token_activation_time,token_activation_policy_id,license_last_accept_time,network_time_policy_id,common_policy_user_flag,common_policy_auth_flag,offline_policy_user_flag,emergency_policy_user_flag,token_activation_policy_user_flag,lockout_attempt_policy_user_flag,network_time_policy_user_flag,last_otp,second_last_otp,error_counter,last_otp_updation_time,country_policy_id,country_policy_user_flag,device_decision,token_revalidation_policy_id,token_revalidation_policy_user_flag,token_assign_time,activation_key,sms_key,activation_time,sms_otp,sms_otp_generation_time,auth_source_id,mobile_app_uptodate_policy,mobile_app_uptodate_policy_user_flag,full_disk_encryption_policy,full_disk_encryption_policy_user_flag,screen_lock_policy,screen_lock_policy_user_flag,device_not_rooted_policy,device_not_rooted_policy_user_flag,passes_google_safety_policy,passes_google_safety_policy_user_flag,finger_print_policy,finger_print_policy_user_flag,touch_or_face_id_policy,touch_or_face_id_policy_user_flag,block_android_os_policy,block_android_os_policy_flag,block_iphone_os_policy,block_iphone_os_policy_flag,notify_android_os_policy,notify_android_os_policy_flag,notify_iphone_os_policy,notify_iphone_os_policy_flag) values (1,1,0,5,0,1,0,0,0,0,0,1,0,'2018-12-07 18:34:10',NULL,NULL,0,0,'dump',0,0,0,0,NULL,0,NULL,0,0,0,0,0,0,0,0,'000000','000000',0,NULL,0,0,NULL,0,0,NULL,NULL,NULL,NULL,NULL,NULL,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);

/*Table structure for table `user_tiles_report_dashboard` */

DROP TABLE IF EXISTS `user_tiles_report_dashboard`;

CREATE TABLE `user_tiles_report_dashboard` (
  `user_tiles_report_dashboard_id` int(11) NOT NULL AUTO_INCREMENT,
  `bio_success_count` int(11) DEFAULT NULL,
  `bio_unsuccess_count` int(11) DEFAULT NULL,
  `push_success_count` int(11) DEFAULT NULL,
  `push_unsuccess_count` int(11) DEFAULT NULL,
  `otp_success_count` int(11) DEFAULT NULL,
  `otp_unsuccess_count` int(11) DEFAULT NULL,
  `domain_name` varchar(50) DEFAULT NULL,
  `insert_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_tiles_report_dashboard_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `user_tiles_report_dashboard` */

/*Table structure for table `finacal_group_user_scheduler` */

DROP TABLE IF EXISTS `finacal_group_user_scheduler`;

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


/*Table structure for table `device_os` */

CREATE TABLE `device_os` (
  `device_os_id` INT(11) NOT NULL AUTO_INCREMENT,
  `device_os_version` VARCHAR(50) DEFAULT NULL,
  `device_os_type` VARCHAR(20) DEFAULT NULL,
  PRIMARY KEY (`device_os_id`)
) ENGINE=INNODB AUTO_INCREMENT=82 DEFAULT CHARSET=latin1;

/*Data for the table `device_os` */

INSERT  INTO `device_os`(device_os_id,device_os_version,device_os_type) VALUES (0,'none','default'),(1,'below 9.0 (Pie)','android'),(2,'below 8.1 (Oreo)','android'),(3,'below 8.0 (Oreo)','android'),(4,'below 7.1 (Nougat)','android'),(5,'below 7.0 (Nougat)','android'),(6,'below 6.0 (Marshmallow)','android'),(7,'below 5.1 (Lollipop)','android'),(8,'below 5.0 (Lollipop)','android'),(9,'below 4.4 (KitKat)','android'),(10,'below 4.3 (Jelly Bean)','android'),(11,'below 4.2 (Jelly Bean)','android'),(12,'below 4.1 (Jelly Bean)','android'),(13,'below 4.0 (Ice Cream Sandwich)','android'),(14,'below 12.1','iphone'),(15,'below 12.0','iphone'),(16,'below 11.4','iphone'),(17,'below 11.3','iphone'),(18,'below 11.2','iphone'),(19,'below 11.1','iphone'),(20,'below 11.0','iphone'),(21,'below 10.3','iphone'),(22,'below 10.2','iphone'),(23,'below 10.1','iphone'),(24,'below 10.0','iphone'),(25,'below 9.3','iphone'),(26,'below 9.2','iphone'),(27,'below 9.1','iphone'),(28,'below 9.0','iphone'),(29,'below 8.4','iphone'),(30,'below 8.3','iphone'),(31,'below 8.2','iphone'),(32,'below 8.1','iphone'),(33,'below 8.0','iphone'),(34,'below 7.1','iphone'),(35,'below 7.0','iphone'),(36,'below 6.1','iphone'),(37,'below 6.0','iphone'),(38,'below 5.1','iphone'),(39,'below 5.0','iphone');

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





/*Table structure for table `oauth_client_details` */

DROP TABLE IF EXISTS `oauth_client_details`;

CREATE TABLE `oauth_client_details` (
  `client_id` varchar(256) NOT NULL,
  `resource_ids` varchar(256) DEFAULT NULL,
  `client_secret` varchar(256) DEFAULT NULL,
  `scope` varchar(256) DEFAULT NULL,
  `authorized_grant_types` varchar(256) DEFAULT NULL,
  `web_server_redirect_uri` varchar(256) DEFAULT NULL,
  `authorities` varchar(256) DEFAULT NULL,
  `access_token_validity` int(11) DEFAULT NULL,
  `refresh_token_validity` int(11) DEFAULT NULL,
  `additional_information` varchar(4096) DEFAULT NULL,
  `autoapprove` varchar(256) DEFAULT NULL,
  `client_unique_id` varchar(255) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `company_size` varchar(255) DEFAULT NULL,
  `creation_date` datetime DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`client_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `oauth_client_details` */

insert  into `oauth_client_details`(client_id,resource_ids,client_secret,scope,authorized_grant_types,web_server_redirect_uri,authorities,access_token_validity,refresh_token_validity,additional_information,autoapprove,client_unique_id,company_name,company_size,creation_date,mobile) values ('NICDA5TA4PDZV',NULL,'$2a$10$/ccdEgLAVMdJ5JCSnAkTreu3YcKkiZFEFRgeS4phRjFD2aD67ZZ46','foo,read,write','client_credentials,password,authorization_code,refresh_token',NULL,NULL,400,500,NULL,'true',NULL,NULL,NULL,NULL,NULL),('innefu',NULL,'innefu_abhi1','foo,read,write','client_credentials',NULL,NULL,60,500,NULL,'true',NULL,NULL,NULL,NULL,NULL);


/*Table structure for table `da_admin_log` */

DROP TABLE IF EXISTS `da_admin_log`;

CREATE TABLE `da_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_logon_id` varchar(100) DEFAULT NULL,
  `user_logon_id` varchar(100) DEFAULT NULL,
  `activity` text,
  `activity_type` varchar(50) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `activity_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;


/*Table structure for table `whitelisted_user_device_mapping` */
 
DROP TABLE IF EXISTS `whitelisted_user_device_mapping`;

CREATE TABLE `whitelisted_user_device_mapping` (
  `whitelisted_user_device_mapping_id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) DEFAULT NULL,
  `device_id` varchar(255) DEFAULT NULL,
  `creation_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`whitelisted_user_device_mapping_id`),
  UNIQUE KEY `user_device` (`device_id`,`user_id`),
  KEY `FK_whitelisted_user_device_mapping` (`user_id`),
  CONSTRAINT `FK_whitelisted_user_device_mapping` FOREIGN KEY (`user_id`) REFERENCES `user_detail` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=185 DEFAULT CHARSET=latin1;


/*Table structure for table `geo_ip_ipv6` */

CREATE TABLE `geo_ip_ipv6` (
  `geo_ip_ipv6_id` int(11) NOT NULL AUTO_INCREMENT,
  `ip_start` varchar(50) DEFAULT NULL,
  `ip_end` varchar(50) DEFAULT NULL,
  `geoname_id` int(11) DEFAULT NULL,
  `registered_country_geoname_id` int(11) DEFAULT NULL,
  `represented_country_geoname_id` int(11) DEFAULT NULL,
  `is_anonymous_proxy` varchar(50) DEFAULT NULL,
  `is_satellite_provider` varchar(50) DEFAULT NULL,
  `postal_code` varchar(50) DEFAULT NULL,
  `latitude` varchar(50) DEFAULT NULL,
  `longitude` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`geo_ip_ipv6_id`),
  KEY `NewIndex1` (`ip_start`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `geo_city_ipv6` */

CREATE TABLE `geo_city_ipv6` (
  `geo_city_ipv6_id` int(11) NOT NULL AUTO_INCREMENT,
  `geoname_id` int(11) DEFAULT NULL,
  `locale_code` varchar(50) DEFAULT NULL,
  `continent_code` varchar(50) DEFAULT NULL,
  `continent_name` varchar(50) DEFAULT NULL,
  `country_iso_code` varchar(50) DEFAULT NULL,
  `country_name` varchar(50) DEFAULT NULL,
  `subdivision_1_iso_code` varchar(50) DEFAULT NULL,
  `subdivision_1_name` varchar(100) DEFAULT NULL,
  `subdivision_2_iso_code` varchar(50) DEFAULT NULL,
  `subdivision_2_name` varchar(50) DEFAULT NULL,
  `city_name` varchar(100) DEFAULT NULL,
  `metro_code` varchar(50) DEFAULT NULL,
  `time_zone` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`geo_city_ipv6_id`),
  KEY `NewIndex1` (`geoname_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;

/*Table structure for table `user_pop_imap_mapping` */

CREATE TABLE `user_pop_imap_mapping` (
`user_pop_imap_mapping_id` int(11) NOT NULL AUTO_INCREMENT,
`user_id` int(11) DEFAULT NULL,
`pop_counter` int(11) DEFAULT NULL,
`pop_timestamp` timestamp NULL DEFAULT NULL,
`imap_counter` int(11) DEFAULT NULL,
`imap_timestamp` timestamp NULL DEFAULT NULL,
PRIMARY KEY (`user_pop_imap_mapping_id`),
KEY `FK_user_pop_imap_mapping` (`user_id`),
CONSTRAINT `FK_user_pop_imap_mapping` FOREIGN KEY (`user_id`) REFERENCES `user_detail` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB  DEFAULT CHARSET=latin1;


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
