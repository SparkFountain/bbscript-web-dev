<?php
  // Allow from any origin
  if (isset($_SERVER['HTTP_ORIGIN'])) {
    // should do a check here to match $_SERVER['HTTP_ORIGIN'] to a
    // whitelist of safe domains
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
  }

  $method = $_SERVER['REQUEST_METHOD'];

  // Access-Control headers are received during OPTIONS requests
  if ($method == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
      header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    }

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
      header('Access-Control-Allow-Headers: '.$_SERVER["HTTP_ACCESS_CONTROL_REQUEST_HEADERS"]);
    }
  }

  /* RESPONSE HEADER */
  header('Content-Type: application/json; charset=utf-8');

  /* GET URL SECTIONS */
  $urlWithoutGetParams = strtok(strtolower($_SERVER['REQUEST_URI']), '?');
  $urlSection = explode('/', $urlWithoutGetParams);
  unset($urlSection['0']);  //remove first section, which is always empty


  /* DATABASE CONNETION */
  $servername = 'localhost';
  $username = 'web23388256';
  $password = 'RZ0SdlIv2mutKjwejcRe';
  $dbname = 'usr_web23388256_2';

  /* DATABASE 1: Web */
  $dbWeb = new mysqli($servername, $username, $password, 'usr_web23388256_1');
  // Check connection
  if ($dbWeb->connect_error) {
      die('Connection failed: ' . $dbWeb->connect_error);
  }
  $dbWeb->set_charset('utf8');

  /* DATABASE 2: BBScript Language */
  $dbLanguage = new mysqli($servername, $username, $password, 'usr_web23388256_2');
  // Check connection
  if ($dbLanguage->connect_error) {
      die('Connection failed: ' . $dbLanguage->connect_error);
  }
  $dbLanguage->set_charset('utf8');

  /* RESPONSE STATUS CODES */
  define('STATUS_SUCCESS', 'success');
  define('STATUS_ERROR', 'error');
  define('STATUS_FAIL', 'fail');

  /* FILE SERVER */
  define('FILE_SERVER', 'http://files.blitzbasicscript.com');


  if ($method == 'GET') {
    switch ($urlSection['1']) {
      case 'docs':
        if(isset($urlSection['2']) && $urlSection['2'] != '') {
          switch($urlSection['2']) {
            case 'categories':
              if(isset($urlSection['3']) && $urlSection['3'] != '') {
                switch($urlSection['3']) {
                  case 'keywords':
                    $sqlEn = 'SELECT title_en AS title, description_en AS description FROM keyword_category';
                    $resultEn = $dbLanguage->query($sqlEn);
                    $sqlDe = 'SELECT title_de AS title, description_de AS description FROM keyword_category';
                    $resultDe = $dbLanguage->query($sqlDe);

                    $categories = array('en' => array(), 'de' => array());

                    while($rowEn = $resultEn->fetch_assoc()) {
                      array_push($categories['en'], $rowEn);
                    }
                    while($rowDe = $resultDe->fetch_assoc()) {
                      array_push($categories['de'], $rowDe);
                    }
                    echo json_encode(array('status' => STATUS_SUCCESS, 'data' => $categories));
                    break;
                  case 'commands':
                    $sqlEn = 'SELECT title_en, description_en FROM command_category';
                    $resultEn = $dbLanguage->query($sqlEn);
                    $sqlDe = 'SELECT title_de, description_de FROM command_category';
                    $resultDe = $dbLanguage->query($sqlDe);

                    $categories = array('en' => array(), 'de' => array());

                    while($rowEn = $resultEn->fetch_assoc()) {
                      array_push($categories['en'], $rowEn);
                    }
                    while($rowDe = $resultDe->fetch_assoc()) {
                      array_push($categories['de'], $rowDe);
                    }
                    echo json_encode(array('status' => STATUS_SUCCESS, 'data' => $categories));
                }
              break;
            }
          }
        } else {
          echo json_encode(array('status' => STATUS_ERROR, 'message' => 'Please specify which part of the documentation you would like to retrieve.'));
        }
        break;
      case 'keywords':
        if(isset($urlSection['2']) && $urlSection['2'] != '') {
          $sql = 'SELECT id, name, deprecated FROM keyword WHERE name = \''.strtolower($urlSection['2']).'\'';
          $result = $dbLanguage->query($sql);

          if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
              echo json_encode(array('status' => STATUS_SUCCESS, 'data' => $row));
            }
          } else {
            echo json_encode(array('status' => STATUS_ERROR, 'message' => 'Invalid key word'));
          }
        } else {
          $sql = 'SELECT id, name, deprecated FROM keyword';
          if(isset($_GET['deprecated'])) {
            $sql .= ' WHERE deprecated = '.$_GET['deprecated'];
          }

          $result = $dbLanguage->query($sql);
          if ($result->num_rows > 0) {
            $keywords = array();
            while($row = $result->fetch_assoc()) {
              $keywords[strtolower($row['name'])] = array(
                'name' => $row['name'],
                'deprecated' => $row['deprecated']
              );
            }
            echo json_encode(array('status' => STATUS_SUCCESS, 'data' => $keywords), JSON_NUMERIC_CHECK);
          } else {
            echo json_encode(array('status' => STATUS_SUCCESS, 'message' => null));
          }
        }
        break;
      case 'commands':
        $sql = 'SELECT cmd.id AS id, cmd.name AS name, cat.name AS category, subcat.name AS subCategory, cmd.`return_name`, cmd.`return_description_en`, cmd.`return_description_de`, cmd.`description_en`, cmd.`description_de`, cmd.`code` FROM command cmd';
        $sql .= ' JOIN command_category cat ON cmd.category = cat.id';
        $sql .= ' JOIN command_category subcat ON cmd.sub_category = subcat.id';
        if(isset($_GET['deprecated'])) {
          $sql .= ' WHERE deprecated = '.$_GET['deprecated'];
        }
        if(isset($_GET['category'])) {
          $sql .= ' AND category = \''.$_GET['category'].'\'';
        }
        if(isset($_GET['sub_category'])) {
          $sql .= ' AND sub_category = \''.$_GET['sub_category'].'\'';
        }

        $result = $dbLanguage->query($sql);

        if ($result->num_rows > 0) {
          $commands = array();
          while($row = $result->fetch_assoc()) {
            // get command params
            $row['params'] = array();
            $paramSql = 'SELECT cp.name, cp.optional FROM command_parameter cp WHERE command_id = '.$row['id'].' ORDER BY cp.offset';
            $paramResult = $dbLanguage->query($paramSql);
            if($paramResult->num_rows > 0) {
              while($paramRow = $paramResult->fetch_assoc()) {
                array_push($row['params'], $paramRow);
              }
            }

            // add command to array
            $commands[strtolower($row['name'])] = array(
              'name' => $row['name'],
              'description' => array(
                'en' => $row['description_en'],
                'de' => $row['description_de']
              ),
              'category' => $row['category'],
              'subCategory' => $row['subCategory'],
              'params' => $row['params'],
              'return' => array(
                'name' => $row['return_name'],
                'description' => array(
                  'en' => $row['return_description_en'],
                  'de' => $row['return_description_de']
                )
              ),
              'code' => $row['code']
            );
          }
          echo json_encode(array('status' => STATUS_SUCCESS, 'data' => $commands), JSON_NUMERIC_CHECK);
        } else {
          echo json_encode(array('status' => STATUS_SUCCESS, 'data' => null));
        }
        break;
			case 'command-categories':
				$sql = 'SELECT cmd.id AS id, cmd.name AS name, cat.name AS category, subcat.name AS subCategory, cmd.`description_en`, cmd.`description_de`, cmd.`code` FROM command cmd';
        $sql .= ' JOIN command_category cat ON cmd.category = cat.id';
        $sql .= ' JOIN command_category subcat ON cmd.sub_category = subcat.id';
				$sql .= ' ORDER BY cat.name, subcat.name';

        $result = $dbLanguage->query($sql);

        if ($result->num_rows > 0) {
          $categories = array();
          while($row = $result->fetch_assoc()) {
            // echo(print_r($row));

            if(!array_key_exists($row['category'], $categories)) {
              $categories[$row['category']] = array();
            }
            if(!array_key_exists($row['subCategory'], $categories[$row['category']])) {
              $categories[$row['category']][$row['subCategory']] = array();
            }

            $categories[$row['category']][$row['subCategory']][strtolower($row['name'])] = array(
              'name' => $row['name'],
              'description' => array(
                'en' => $row['description_en'],
                'de' => $row['description_de']
              ),
              'code' => $row['code']
            );
          }
          echo json_encode(array('status' => STATUS_SUCCESS, 'data' => $categories), JSON_NUMERIC_CHECK);
        } else {
          echo json_encode(array('status' => STATUS_SUCCESS, 'data' => null));
        }
				break;
      case 'commands-plain':
        $sql = 'SELECT cmd.name FROM command cmd';

        $result = $dbLanguage->query($sql);
        if ($result->num_rows > 0) {
          $commands = '';
          while($row = $result->fetch_assoc()) {
            //refine description and return structure
            $commands .= $row['name'].'|';
          }
          echo json_encode(array('status' => STATUS_SUCCESS, 'data' => $commands), JSON_NUMERIC_CHECK);
        } else {
          echo json_encode(array('status' => STATUS_SUCCESS, 'data' => null));
        }
        break;
      case 'files':
        if(isset($urlSection[2])) {
          switch($method) {
            case 'GET':
              //TODO implement user name and token
              $user = 'spark_fountain';

              $fileContent = file_get_contents(FILE_SERVER.'/'.$user.'/'.$urlSection[2]);
              echo json_encode(array('status' => STATUS_SUCCESS, 'data' => $fileContent), JSON_NUMERIC_CHECK);
              break;
            case 'POST':
              echo json_encode(array('status' => STATUS_ERROR, 'message' => 'Posting data is not implemented yet.'));
          }
        } else {

        }
        break;
      case 'projects':
        if(isset($urlSection[2])) {

        } else {
          $sql = 'SELECT p.id, p.user_id, p.title, p.description, p.thumbnail_url, p.code, p.created_at, p.last_modified_at FROM project p';

          $result = $dbWeb->query($sql);
          if ($result->num_rows > 0) {
            $data = array();
            while($outerRow = $result->fetch_assoc()) {
              $sqlGetUser = 'SELECT id, name, email FROM user WHERE id = '.$outerRow['user_id'];
              $userResult = $dbWeb->query($sqlGetUser);
              while($innerRow = $userResult->fetch_assoc()) {
                $outerRow['user'] = $innerRow;
                unset($outerRow['user_id']);
                array_push($data, $outerRow);
              }
            }
            echo json_encode(array('status' => STATUS_SUCCESS, 'data' => $data));
          } else {
            echo json_encode(array('status' => STATUS_SUCCESS, 'data' => null));
          }
        }
        break;
      case 'username-exists':
        $checkIfUserExistsSql = 'SELECT u.id FROM user u WHERE u.name = \''.$_GET['username'].'\'';
        $result = $dbWeb->query($checkIfUserExistsSql);
        if($result) {
          if ($result->num_rows > 0) {
            die(json_encode(array('status' => STATUS_SUCCESS, 'data' => array('exists' => true))));
          } else {
            die(json_encode(array('status' => STATUS_SUCCESS, 'data' => array('exists' => false))));
          }
        } else {
          die(json_encode(array('status' => STATUS_ERROR, 'message' => 'username-exists-query-error')));
        }

        break;
      case 'email-exists':
        $checkIfEmailExistsSql = 'SELECT u.id FROM user u WHERE u.`email` = \''.$_GET['email'].'\'';
        $result = $dbWeb->query($checkIfEmailExistsSql);
        if($result) {
          if ($result->num_rows > 0) {
            die(json_encode(array('status' => STATUS_SUCCESS, 'data' => array('exists' => true))));
          } else {
            die(json_encode(array('status' => STATUS_SUCCESS, 'data' => array('exists' => false))));
          }
        } else {
          die(json_encode(array('status' => STATUS_ERROR, 'message' => 'email-exists-query-error')));
        }

        break;
      case 'news':
        if(!$_GET['language']) {
          die(json_encode(array('status' => STATUS_FAIL, 'message' => 'You must send a language query parameter.')));
        }
        $sql = 'SELECT n.id, n.title, n.message, u.name as author, n.created_at AS createdAt, n.last_modified_at AS lastModifiedAt, n.image FROM news n, user u';
        $sql .= ' WHERE u.id = n.author';
        $sql .= ' AND language = "'.$_GET['language'].'"';
        $sql .= ' ORDER BY n.created_at DESC';
        if($_GET['limit']) {
          $sql .= ' LIMIT '.$_GET['limit'];
        }
        // die($sql);
        $result = $dbWeb->query($sql);
        if ($result->num_rows > 0) {
          $keywords = array();
          while($row = $result->fetch_assoc()) {
            array_push($keywords, $row);
          }
          echo json_encode(array('status' => STATUS_SUCCESS, 'data' => $keywords), JSON_NUMERIC_CHECK);
        } else {
          echo json_encode(array('status' => STATUS_FAIL, 'message' => null));
        }
        break;
        case 'new-features':
          if(!$_GET['language']) {
            die(json_encode(array('status' => STATUS_FAIL, 'message' => 'You must send a language query parameter.')));
          }
          $sql = 'SELECT n.id, n.title, n.message, u.name as author, n.created_at AS createdAt, n.last_modified_at AS lastModifiedAt, n.image FROM new_features n, user u';
          $sql .= ' WHERE u.id = n.author';
          $sql .= ' AND language = "'.$_GET['language'].'"';
          $sql .= ' ORDER BY n.created_at DESC';
          if($_GET['limit']) {
            $sql .= ' LIMIT '.$_GET['limit'];
          }
          // die($sql);
          $result = $dbWeb->query($sql);
          if ($result->num_rows > 0) {
            $keywords = array();
            while($row = $result->fetch_assoc()) {
              array_push($keywords, $row);
            }
            echo json_encode(array('status' => STATUS_SUCCESS, 'data' => $keywords), JSON_NUMERIC_CHECK);
          } else {
            echo json_encode(array('status' => STATUS_FAIL, 'message' => null));
          }
          break;
      default:
        echo json_encode(array('status' => STATUS_ERROR, 'message' => 'Invalid API call.'));
        break;
    }
  } elseif($method == 'POST') {
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, TRUE); //convert JSON into array

    switch($urlSection['1']) {
      case 'register':
        if(strlen($input['username']) < 2) {
          echo json_encode(array('status' => STATUS_FAIL, 'message' => 'username-too-short'));
        } elseif(strlen($input['username']) > 32) {
          echo json_encode(array('status' => STATUS_FAIL, 'message' => 'username-too-long'));
        } elseif(preg_match('/^[a-zA-Z0-9 ]*$/', $input['username']) != 1) {
          echo json_encode(array('status' => STATUS_FAIL, 'message' => 'invalid-username'));
        } elseif(strlen($input['password']) < 8) {
          echo json_encode(array('status' => STATUS_FAIL, 'message' => 'password-too-short'));
        }

        // check if username is already reserved
        $checkIfUserExistsSql = 'SELECT u.id FROM user u WHERE u.name = \''.$input['username'].'\'';
        $result = $dbWeb->query($checkIfUserExistsSql);
        if ($result->num_rows > 0) {
          die(json_encode(array('status' => STATUS_FAIL, 'message' => 'username-exists')));
        }

        // generate password hash and current date
        $passwordHash = password_hash($input['password'], PASSWORD_DEFAULT);
        $registration = date("Y-m-d H:i:s");

        // if everything is alright: create new user
        $createUserSql = 'INSERT INTO `user`(`name`, `email`, `password`, `registration`, `active`)';
        $createUserSql .= ' VALUES (\''.$input['username'].'\',\''.$input['email'].'\',\''.$passwordHash.'\',\''.$registration.'\',false)';

        $result = $dbWeb->query($createUserSql);
        if ($result) {
          echo json_encode(array('status' => STATUS_SUCCESS));
        } else {
          echo json_encode(array('status' => STATUS_ERROR, 'message' => 'registration-error'));
        }

        // die(print_r($input));

        break;
      case 'login':
        $sql = 'SELECT u.email, u.password, u.active FROM user u WHERE u.name = \''.$input['userOrEmail'].'\' OR u.email = \''.$input['userOrEmail'].'\'';

        $result = $dbWeb->query($sql);
        if($result) {
          if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
              if($row['active']) {
                if(password_verify($input['password'], $row['password'])) {
                  $token = bin2hex(random_bytes(64));
                  $storeTokenSql = 'UPDATE `user` u SET `token`=\''.$token.'\' WHERE u.email = \''.$row['email'].'\'';
                  $storeResult = $dbWeb->query($storeTokenSql);
                  if($storeResult) {
                    die(json_encode(array('status' => STATUS_SUCCESS, 'data' => array('token' => $token)), JSON_NUMERIC_CHECK));
                  } else {
                    die(json_encode(array('status' => STATUS_ERROR, 'code' => '500', 'message' => 'token-error')));
                  }
                } else {
                  die(json_encode(array('status' => STATUS_FAIL, 'message' => 'username-password-combination-invalid')));
                }
              } else {
                die(json_encode(array('status' => STATUS_FAIL, 'message' => 'user-not-active')));
              }
            }
          } else {
            die(json_encode(array('status' => STATUS_FAIL, 'message' => 'username-password-combination-invalid')));
          }
        } else {
          die(json_encode(array('status' => STATUS_ERROR, 'code' => '500', 'message' => 'login-error')));
        }

        break;
      case 'logout':
        $removeTokenSql = 'UPDATE `user` u SET `token`=\'\' WHERE u.name = \''.$input['userOrEmail'].'\' OR u.email = \''.$input['userOrEmail'].'\'';
        $removeTokenSql = $dbWeb->query($removeTokenSql);
        if($removeTokenSql) {
          die(json_encode(array('status' => STATUS_SUCCESS), JSON_NUMERIC_CHECK));
        } else {
          die(json_encode(array('status' => STATUS_ERROR, 'code' => '500', 'message' => 'logout-error')));
        }

        break;
    }
  }

  $dbLanguage->close();
?>
