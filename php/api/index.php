<?php
// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
  // should do a check here to match $_SERVER['HTTP_ORIGIN'] to a
  // whitelist of safe domains
  header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Credentials: true');
  header('Access-Control-Max-Age: 86400'); // cache for 1 day
}

$method = $_SERVER['REQUEST_METHOD'];

// Access-Control headers are received during OPTIONS requests
if ($method == 'OPTIONS') {
  if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
  }

  if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
    header('Access-Control-Allow-Headers: ' . $_SERVER["HTTP_ACCESS_CONTROL_REQUEST_HEADERS"]);
  }
}

/* RESPONSE HEADER */
header('Content-Type: application/json; charset=utf-8');

/* GET URL SECTIONS */
$urlWithoutGetParams = strtok(strtolower($_SERVER['REQUEST_URI']), '?');
$urlSection = explode('/', $urlWithoutGetParams);
unset($urlSection['0']); //remove first section, which is always empty

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

/* MAIL SERVER */
define('MAIL_SERVER', 'http://mail.blitzbasicscript.com');

if ($method == 'GET') {
  switch ($urlSection['1']) {
  case 'docs':
    $languageKey = $_GET['language'];

    if (isset($urlSection['2']) && $urlSection['2'] != '') {
      switch ($urlSection['2']) {
      case 'categories':
        if (isset($urlSection['3']) && $urlSection['3'] != '') {
          switch ($urlSection['3']) {
          case 'keywords':
            if (isset($urlSection['4']) && $urlSection['4'] != '') {
              $sql = "SELECT k.`name`, k.`description_$languageKey` as `description` FROM `keyword` k, `keyword_category` cat WHERE k.`category_id` = cat.id AND cat.`path_$languageKey` = '" . $urlSection['4'] . "'";
              $result = $dbLanguage->query($sql);

              $keywords = array();
              while ($row = $result->fetch_assoc()) {
                array_push($keywords, $row);
              }
              die(json_encode(array('status' => STATUS_SUCCESS, 'data' => $keywords)));
            } else {
              $sql = "SELECT `path_$languageKey` as `path`, `title_$languageKey` as `title`, `description_$languageKey` as `description` FROM `keyword_category`";
              $result = $dbLanguage->query($sql);

              $keywordCategories = array();
              while ($row = $result->fetch_assoc()) {
                array_push($keywordCategories, $row);
              }
              die(json_encode(array('status' => STATUS_SUCCESS, 'data' => $keywordCategories)));
            }
          case 'commands':
            if (isset($urlSection['4']) && $urlSection['4'] != '') {
              // second level command categories
              if (isset($urlSection['5']) && $urlSection['5'] != '') {
                // third level commands
                $sql = "SELECT cmd.`name`, ";
                $sql .= "cmd.`description_$languageKey` as `description` ";
                $sql .= "FROM `command` cmd, `command_category` cat ";
                $sql .= "WHERE cat.`path_$languageKey` = '" . $urlSection['5'] . "' ";
                $sql .= "AND cmd.`sub_category` = cat.id";
                $result = $dbLanguage->query($sql);

                $commandCategories = array();
                while ($row = $result->fetch_assoc()) {
                  array_push($commandCategories, $row);
                }
                die(json_encode(array('status' => STATUS_SUCCESS, 'data' => $commandCategories)));
              }

              $sql = "SELECT cc.`path_$languageKey` as `path`, cc.`title_$languageKey` as `title`, cc.`description_$languageKey` as `description` FROM `command_category` cc, `command_category` cp WHERE cp.`path_$languageKey` = '" . $urlSection['4'] . "' AND cc.`parent` = cp.id";
              $result = $dbLanguage->query($sql);

              $commandCategories = array();
              while ($row = $result->fetch_assoc()) {
                array_push($commandCategories, $row);
              }
              die(json_encode(array('status' => STATUS_SUCCESS, 'data' => $commandCategories)));
            } else {
              $sql = "SELECT `path_$languageKey` as `path`, `title_$languageKey` as `title`, `description_$languageKey` as `description` FROM `command_category` WHERE `parent` IS NULL";
              $result = $dbLanguage->query($sql);

              $keywordCategories = array();
              while ($row = $result->fetch_assoc()) {
                // filter network category (not supported yet)
                if ($row['title'] !== 'Network' && $row['title'] !== 'Netzwerk') {
                  array_push($keywordCategories, $row);
                }
              }
              die(json_encode(array('status' => STATUS_SUCCESS, 'data' => $keywordCategories)));
            }
          }
        } else {
          $categories = array(
            array(
              'title' => 'KEYWORDS',
              'icon' => 'key',
              'path' => 'schluesselwoerter',
            ),
            array(
              'title' => 'COMMANDS',
              'icon' => 'book',
              'path' => 'befehle',
            ),
            array(
              'title' => 'CONSTANTS_AND_SCANCODES',
              'icon' => 'list-ol',
              'path' => 'konstanten-und-scancodes',
            ),
            array(
              'title' => 'DIFFERENCES_TO_BLITZBASIC',
              'icon' => 'exchange',
              'path' => 'unterschiede-zu-blitz-basic',
            ),
          );

          die(json_encode(array('status' => STATUS_SUCCESS, 'data' => $categories)));
        }
      case 'breadcrumbs':
        $breadcrumbs = array();
        if ($_GET['language']) {
          if ($_GET['language'] === 'en') {
            array_push($breadcrumbs, array(
              'title' => 'Overview',
              'path' => '/documentation',
            ));
          } elseif ($_GET['language'] === 'de') {
            array_push($breadcrumbs, array(
              'title' => 'Übersicht',
              'path' => '/dokumentation',
            ));
          }

          if (isset($_GET['level1'])) {
            switch ($_GET['level1']) {
            case 'keywords':
              array_push($breadcrumbs, array(
                'title' => 'Keywords',
                'path' => '/documentation/keywords',
              ));
              break;
            case 'schluesselwoerter':
              array_push($breadcrumbs, array(
                'title' => 'Schlüsselwörter',
                'path' => '/dokumentation/schluesselwoerter',
              ));
              break;
            case 'commands':
              array_push($breadcrumbs, array(
                'title' => 'Commands',
                'path' => '/documentation/commands',
              ));
              break;
            case 'befehle':
              array_push($breadcrumbs, array(
                'title' => 'Befehle',
                'path' => '/dokumentation/befehle',
              ));
              break;
            case 'constants-and-scancodes':
              array_push($breadcrumbs, array(
                'title' => 'Constants and Scancodes',
                'path' => '/documentation/constants-and-scancodes',
              ));
              break;
            case 'konstanten-und-scancodes':
              array_push($breadcrumbs, array(
                'title' => 'Konstanten und Scancodes',
                'path' => '/dokumentation/konstanten-und-scancodes',
              ));
              break;
            case 'differences-to-blitz-basic':
              array_push($breadcrumbs, array(
                'title' => 'Differences to BlitzBasic',
                'path' => '/documentation/differences-to-blitz-basic',
              ));
              break;
            case 'unterschiede-zu-blitz-basics':
              array_push($breadcrumbs, array(
                'title' => 'Unterschiede zu BlitzBasic',
                'path' => '/dokumentation/unterschiede-zu-blitz-basics',
              ));
              array_push($breadcrumbs, 'Unterschiede zu BlitzBasic');
              break;
            }

            if (isset($_GET['level2'])) {
              if ($languageKey === 'en') {
                $fullPath = '/documentation/' . $_GET['level1'];
              } elseif ($languageKey === 'de') {
                $fullPath = '/dokumentation/' . $_GET['level1'];
              }

              switch ($_GET['level1']) {
              case 'keywords':
              case 'schluesselwoerter':
                // TODO: implement
                break;
              case 'commands':
              case 'befehle':
                $sql = "SELECT `title_$languageKey` as `title`, `path_$languageKey` as `path` FROM `command_category` WHERE `path_$languageKey` = '" . $_GET['level2'] . "'";
                $result = $dbLanguage->query($sql);

                while ($row = $result->fetch_assoc()) {
                  array_push($breadcrumbs, array(
                    'title' => $row['title'],
                    'path' => $fullPath . '/' . $row['path'],
                  ));
                }
                break;
              case 'constants-and-scancodes':
              case 'konstanten-und-scancodes':
                // TODO: implement
                break;
              case 'differences-to-blitz-basic':
              case 'unterschiede-zu-blitz-basics':
                // TODO: implement
                break;
              }
            }

            if (isset($_GET['level3'])) {
              if ($languageKey === 'en') {
                $fullPath = '/documentation/' . $_GET['level1'] . '/' . $_GET['level2'];
              } elseif ($languageKey === 'de') {
                $fullPath = '/dokumentation/' . $_GET['level1'] . '/' . $_GET['level2'];
              }

              switch ($_GET['level1']) {
              case 'keywords':
              case 'schluesselwoerter':
                // TODO: implement
                break;
              case 'commands':
              case 'befehle':
                $sql = "SELECT `title_$languageKey` as `title`, `path_$languageKey` as `path` FROM `command_category` WHERE `path_$languageKey` = '" . $_GET['level3'] . "'";
                $result = $dbLanguage->query($sql);

                while ($row = $result->fetch_assoc()) {
                  array_push($breadcrumbs, array(
                    'title' => $row['title'],
                    'path' => $fullPath . '/' . $row['path'],
                  ));
                }
                break;
              case 'constants-and-scancodes':
              case 'konstanten-und-scancodes':
                // TODO: implement
                break;
              case 'differences-to-blitz-basic':
              case 'unterschiede-zu-blitz-basics':
                // TODO: implement
                break;
              }
            }

            if (isset($_GET['level4'])) {
              if ($languageKey === 'en') {
                $fullPath = '/documentation/' . $_GET['level1'] . '/' . $_GET['level2'] . '/' . $_GET['level3'];
              } elseif ($languageKey === 'de') {
                $fullPath = '/dokumentation/' . $_GET['level1'] . '/' . $_GET['level2'] . '/' . $_GET['level3'];
              }

              switch ($_GET['level1']) {
              case 'keywords':
              case 'schluesselwoerter':
                // TODO: implement
                break;
              case 'commands':
              case 'befehle':
                $sql = "SELECT `name` FROM `command` WHERE UPPER(`name`) LIKE UPPER('" . $_GET['level4'] . "')";
                $result = $dbLanguage->query($sql);

                while ($row = $result->fetch_assoc()) {
                  array_push($breadcrumbs, array(
                    'title' => $row['name'],
                    'path' => $fullPath . '/' . strtolower($row['name']),
                  ));
                }
                break;
              case 'constants-and-scancodes':
              case 'konstanten-und-scancodes':
                // TODO: implement
                break;
              case 'differences-to-blitz-basic':
              case 'unterschiede-zu-blitz-basics':
                // TODO: implement
                break;
              }
            }
          }

          die(json_encode(array('status' => STATUS_SUCCESS, 'data' => $breadcrumbs)));
        } else {
          die(json_encode(array('status' => STATUS_ERROR, 'message' => 'Please provide a language key ("en" and "de" are currently supported).')));
        }

      case 'navigation':
        $navElements = array();

        if ($_GET['language']) {
          if (!isset($_GET['level1'])) {
            // level 0
            if ($_GET['language'] === 'en') {
              array_push($navElements, array(
                'title' => 'Keywords',
                'path' => '/documentation/keywords',
              ));
              array_push($navElements, array(
                'title' => 'Commands',
                'path' => '/documentation/commands',
              ));
              array_push($navElements, array(
                'title' => 'Constants and Scancodes',
                'path' => '/documentation/constants-and-scancodes',
              ));
              array_push($navElements, array(
                'title' => 'Differences to BlitzBasic',
                'path' => '/documentation/differences-to-blitz-basic',
              ));
            } elseif ($_GET['language'] === 'de') {
              array_push($navElements, array(
                'title' => 'Schlüsselwörter',
                'path' => '/documentation/schluesselwoerter',
              ));
              array_push($navElements, array(
                'title' => 'Befehle',
                'path' => '/documentation/befehle',
              ));
              array_push($navElements, array(
                'title' => 'Konstanten und Scancodes',
                'path' => '/documentation/konstanten-und-scancodes',
              ));
              array_push($navElements, array(
                'title' => 'Unterschiede zu BlitzBasic',
                'path' => '/documentation/unterschiede-zu-blitz-basic',
              ));
            }
          } elseif (!isset($_GET['level2'])) {
            // level 1
            if ($languageKey === 'en') {
              $fullPath = '/documentation/' . $_GET['level1'];
            } elseif ($languageKey === 'de') {
              $fullPath = '/dokumentation/' . $_GET['level1'];
            }

            switch ($_GET['level1']) {
            case 'keywords':
            case 'schluesselwoerter':
              $sql = "SELECT `title_$languageKey` as `title`, `path_$languageKey` as `path` FROM `keyword_category`";
              $result = $dbLanguage->query($sql);

              while ($row = $result->fetch_assoc()) {
                array_push($navElements, array(
                  'title' => $row['title'],
                  'path' => $fullPath . '/' . $row['path'],
                ));
              }
              break;
            case 'commands':
            case 'befehle':
              $sql = "SELECT `title_$languageKey` as `title`, `path_$languageKey` as `path` FROM `command_category` WHERE `parent` IS NULL";
              $result = $dbLanguage->query($sql);

              while ($row = $result->fetch_assoc()) {
                // filter network category (not supported yet)
                if ($row['title'] !== 'Network' && $row['title'] !== 'Netzwerk') {
                  array_push($navElements, array(
                    'title' => $row['title'],
                    'path' => $fullPath . '/' . $row['path'],
                  ));
                }
              }
              break;
            case 'constants-and-scancodes':
            case 'konstanten-und-scancodes':
              // TODO: implement
              break;
            case 'differences-to-blitz-basic':
            case 'unterschiede-zu-blitz-basics':
              // TODO: implement
              break;
            }
          } elseif (!isset($_GET['level3'])) {
            // level 2
            if ($languageKey === 'en') {
              $fullPath = '/documentation/' . $_GET['level1'] . '/' . $_GET['level2'];
            } elseif ($languageKey === 'de') {
              $fullPath = '/dokumentation/' . $_GET['level1'] . '/' . $_GET['level2'];
            }

            switch ($_GET['level1']) {
            case 'keywords':
            case 'schluesselwoerter':
              $sql = "SELECT k.`name` FROM `keyword_category` cat, `keyword` k ";
              $sql .= "WHERE cat.`path_$languageKey` = '" . $_GET['level2'] . "' ";
              $sql .= "AND cat.`id` = k.`category_id`";
              $result = $dbLanguage->query($sql);

              while ($row = $result->fetch_assoc()) {
                array_push($navElements, array(
                  'title' => $row['name'],
                  'path' => $fullPath . '/' . strtolower($row['name']),
                ));
              }
              break;
            case 'commands':
            case 'befehle':
              $sql = "SELECT cc.`title_$languageKey` as `title`, cc.`path_$languageKey` as `path` FROM `command_category` cp, `command_category` cc ";
              $sql .= "WHERE cp.`path_$languageKey` = '" . $_GET['level2'] . "' ";
              $sql .= "AND cc.`parent` = cp.`id`";
              $result = $dbLanguage->query($sql);

              while ($row = $result->fetch_assoc()) {
                array_push($navElements, array(
                  'title' => $row['title'],
                  'path' => $fullPath . '/' . $row['path'],
                ));
              }
              break;
            }
          } else {
            // level 3
            if ($languageKey === 'en') {
              $fullPath = '/documentation/' . $_GET['level1'] . '/' . $_GET['level2'] . '/' . $_GET['level3'];
            } elseif ($languageKey === 'de') {
              $fullPath = '/dokumentation/' . $_GET['level1'] . '/' . $_GET['level2'] . '/' . $_GET['level3'];
            }

            $sql = "SELECT cmd.`name` FROM `command_category` cat, `command` cmd ";
            $sql .= "WHERE cat.`path_$languageKey` = '" . $_GET['level3'] . "' ";
            $sql .= "AND cmd.`sub_category` = cat.`id`";
            $result = $dbLanguage->query($sql);

            while ($row = $result->fetch_assoc()) {
              array_push($navElements, array(
                'title' => $row['name'],
                'path' => $fullPath . '/' . strtolower($row['name']),
              ));
            }
          }

          die(json_encode(array('status' => STATUS_SUCCESS, 'data' => $navElements)));
        } else {
          die(json_encode(array('status' => STATUS_ERROR, 'message' => 'Please provide a language key ("en" and "de" are currently supported).')));
        }
      }
    } else {
      echo json_encode(array('status' => STATUS_ERROR, 'message' => 'Please specify which part of the documentation you would like to retrieve.'));
    }
    break;
  case 'keywords':
    if (isset($urlSection['2']) && $urlSection['2'] != '') {
      $sql = 'SELECT id, name, deprecated FROM keyword WHERE name = \'' . strtolower($urlSection['2']) . '\'';
      $result = $dbLanguage->query($sql);

      if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
          echo json_encode(array('status' => STATUS_SUCCESS, 'data' => $row));
        }
      } else {
        echo json_encode(array('status' => STATUS_ERROR, 'message' => 'Invalid key word'));
      }
    } else {
      $sql = 'SELECT id, name, deprecated FROM keyword';
      if (isset($_GET['deprecated'])) {
        $sql .= ' WHERE deprecated = ' . $_GET['deprecated'];
      }

      $result = $dbLanguage->query($sql);
      if ($result->num_rows > 0) {
        $keywords = array();
        while ($row = $result->fetch_assoc()) {
          $keywords[strtolower($row['name'])] = array(
            'name' => $row['name'],
            'deprecated' => $row['deprecated'],
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
    if (isset($_GET['deprecated'])) {
      $sql .= ' WHERE deprecated = ' . $_GET['deprecated'];
    }
    if (isset($_GET['category'])) {
      $sql .= ' AND category = \'' . $_GET['category'] . '\'';
    }
    if (isset($_GET['sub_category'])) {
      $sql .= ' AND sub_category = \'' . $_GET['sub_category'] . '\'';
    }

    $result = $dbLanguage->query($sql);

    if ($result->num_rows > 0) {
      $commands = array();
      while ($row = $result->fetch_assoc()) {
        // get command params
        $row['params'] = array();
        $paramSql = 'SELECT cp.name, cp.optional FROM command_parameter cp WHERE command_id = ' . $row['id'] . ' ORDER BY cp.offset';
        $paramResult = $dbLanguage->query($paramSql);
        if ($paramResult->num_rows > 0) {
          while ($paramRow = $paramResult->fetch_assoc()) {
            array_push($row['params'], $paramRow);
          }
        }

        // add command to array
        $commands[strtolower($row['name'])] = array(
          'name' => $row['name'],
          'description' => array(
            'en' => $row['description_en'],
            'de' => $row['description_de'],
          ),
          'category' => $row['category'],
          'subCategory' => $row['subCategory'],
          'params' => $row['params'],
          'return' => array(
            'name' => $row['return_name'],
            'description' => array(
              'en' => $row['return_description_en'],
              'de' => $row['return_description_de'],
            ),
          ),
          'code' => $row['code'],
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
      while ($row = $result->fetch_assoc()) {
        // echo(print_r($row));

        if (!array_key_exists($row['category'], $categories)) {
          $categories[$row['category']] = array();
        }
        if (!array_key_exists($row['subCategory'], $categories[$row['category']])) {
          $categories[$row['category']][$row['subCategory']] = array();
        }

        $categories[$row['category']][$row['subCategory']][strtolower($row['name'])] = array(
          'name' => $row['name'],
          'description' => array(
            'en' => $row['description_en'],
            'de' => $row['description_de'],
          ),
          'code' => $row['code'],
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
      while ($row = $result->fetch_assoc()) {
        //refine description and return structure
        $commands .= $row['name'] . '|';
      }
      echo json_encode(array('status' => STATUS_SUCCESS, 'data' => $commands), JSON_NUMERIC_CHECK);
    } else {
      echo json_encode(array('status' => STATUS_SUCCESS, 'data' => null));
    }
    break;
  case 'files':
    if (isset($urlSection[2])) {
      switch ($method) {
      case 'GET':
        //TODO implement user name and token
        $user = 'spark_fountain';

        $fileContent = file_get_contents(FILE_SERVER . '/' . $user . '/' . $urlSection[2]);
        echo json_encode(array('status' => STATUS_SUCCESS, 'data' => $fileContent), JSON_NUMERIC_CHECK);
        break;
      case 'POST':
        echo json_encode(array('status' => STATUS_ERROR, 'message' => 'Posting data is not implemented yet.'));
      }
    } else {
    }
    break;
  case 'projects':
    if (isset($urlSection[2])) {
    } else {
      $sql = 'SELECT p.id, p.user_id, p.title, p.description, p.thumbnail_url, p.code, p.created_at, p.last_modified_at FROM project p';

      $result = $dbWeb->query($sql);
      if ($result->num_rows > 0) {
        $data = array();
        while ($outerRow = $result->fetch_assoc()) {
          $sqlGetUser = 'SELECT id, name, email FROM user WHERE id = ' . $outerRow['user_id'];
          $userResult = $dbWeb->query($sqlGetUser);
          while ($innerRow = $userResult->fetch_assoc()) {
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
    $checkIfUserExistsSql = 'SELECT u.id FROM user u WHERE u.name = \'' . $_GET['username'] . '\'';
    $result = $dbWeb->query($checkIfUserExistsSql);
    if ($result) {
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
    $checkIfEmailExistsSql = 'SELECT u.id FROM user u WHERE u.`email` = \'' . $_GET['email'] . '\'';
    $result = $dbWeb->query($checkIfEmailExistsSql);
    if ($result) {
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
    if (!$_GET['language']) {
      die(json_encode(array('status' => STATUS_FAIL, 'message' => 'You must send a language query parameter.')));
    }
    $sql = 'SELECT n.id, n.title, n.message, u.name as author, n.created_at AS createdAt, n.last_modified_at AS lastModifiedAt, n.image FROM news n, user u';
    $sql .= ' WHERE u.id = n.author';
    $sql .= ' AND language = "' . $_GET['language'] . '"';
    $sql .= ' ORDER BY n.created_at DESC';
    if ($_GET['limit']) {
      $sql .= ' LIMIT ' . $_GET['limit'];
    }
    // die($sql);
    $result = $dbWeb->query($sql);
    if ($result->num_rows > 0) {
      $keywords = array();
      while ($row = $result->fetch_assoc()) {
        array_push($keywords, $row);
      }
      echo json_encode(array('status' => STATUS_SUCCESS, 'data' => $keywords), JSON_NUMERIC_CHECK);
    } else {
      echo json_encode(array('status' => STATUS_FAIL, 'message' => null));
    }
    break;
  case 'new-features':
    if (!$_GET['language']) {
      die(json_encode(array('status' => STATUS_FAIL, 'message' => 'You must send a language query parameter.')));
    }
    $sql = 'SELECT n.id, n.title, n.message, u.name as author, n.created_at AS createdAt, n.last_modified_at AS lastModifiedAt, n.image FROM new_features n, user u';
    $sql .= ' WHERE u.id = n.author';
    $sql .= ' AND language = "' . $_GET['language'] . '"';
    $sql .= ' ORDER BY n.created_at DESC';
    if ($_GET['limit']) {
      $sql .= ' LIMIT ' . $_GET['limit'];
    }
    // die($sql);
    $result = $dbWeb->query($sql);
    if ($result->num_rows > 0) {
      $keywords = array();
      while ($row = $result->fetch_assoc()) {
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
} elseif ($method == 'POST') {
  $inputJSON = file_get_contents('php://input');
  $input = json_decode($inputJSON, true); //convert JSON into array

  switch ($urlSection['1']) {
  case 'register':
    $errors = array();

    if (strlen($_POST['username']) < 2) {
      array_push($errors, 'username-too-short');
    } elseif (strlen($_POST['username']) > 32) {
      array_push($errors, 'username-too-long');
    } elseif (preg_match('/^[a-zA-Z0-9 ]*$/', $_POST['username']) != 1) {
      array_push($errors, 'invalid-username');
    } elseif (strlen($_POST['password']) < 8) {
      array_push($errors, 'password-too-short');
    }

    if (strlen($_POST['email']) === 0) {
      array_push($errors, 'email-empty');
    } elseif (preg_match('/^[^@\s]+@[^@\s]+\.[^@\s]+$/', $_POST['email']) != 1) {
      array_push($errors, 'email-invalid');
    }

    if ($_POST['termsAccepted'] == false) {
      array_push($errors, 'terms-must-be-accepted');
    }

    if (count($errors) > 0) {
      die(json_encode(array('status' => STATUS_FAIL, 'message' => 'Registry failed', 'data' => $errors)));
    }

    // check if username is already reserved
    $checkIfUserExistsSql = 'SELECT u.id FROM user u WHERE u.name = \'' . $_POST['username'] . '\'';
    $result = $dbWeb->query($checkIfUserExistsSql);
    if ($result->num_rows > 0) {
      die(json_encode(array('status' => STATUS_FAIL, 'message' => 'username-exists')));
    }

    // generate password hash and current date
    $passwordHash = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $registration = date("Y-m-d H:i:s");

    // if everything is alright: create new user
    $createUserSql = 'INSERT INTO `user`(`name`, `email`, `password`, `registration`, `active`)';
    $createUserSql .= ' VALUES (\'' . $_POST['username'] . '\',\'' . $_POST['email'] . '\',\'' . $passwordHash . '\',\'' . $registration . '\',false)';

    $result = $dbWeb->query($createUserSql);
    if ($result) {
      // send confirmation email
      $to = $_POST['email'];
      $subject = 'Deine Registrierung bei BlitzBasicScript';

      $headers = [
        'MIME-Version' => '1.0',
        'Content-type' => 'text/html; charset=UTF-8',
        'From' => "BlitzBasicScript <info@blitzbasicscript.com>",
        'X-Mailer' => 'PHP/' . phpversion(),
      ];

      $mailContent = file_get_contents(MAIL_SERVER . '/registration-de.html');

      $status = mail($to, $subject, $mailContent, $headers);
      if ($status == false) {
        $deleteUserSql = 'DELETE FROM `user` WHERE `email` = \'' . $_POST['email'] . '\'';
        $dbWeb->query($deleteUserSql);

        die(json_encode(array('status' => STATUS_ERROR, 'message' => 'Your confirmation email could not be sent.')));
      }

      echo json_encode(array('status' => STATUS_SUCCESS));
    } else {
      echo json_encode(array('status' => STATUS_ERROR, 'message' => 'Registration Error'));
    }

    break;
  case 'login':
    $sql = 'SELECT u.email, u.password, u.active FROM user u WHERE u.name = \'' . $input['userOrEmail'] . '\' OR u.email = \'' . $input['userOrEmail'] . '\'';

    $result = $dbWeb->query($sql);
    if ($result) {
      if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
          if ($row['active']) {
            if (password_verify($input['password'], $row['password'])) {
              $token = bin2hex(random_bytes(64));
              $storeTokenSql = 'UPDATE `user` u SET `token`=\'' . $token . '\' WHERE u.email = \'' . $row['email'] . '\'';
              $storeResult = $dbWeb->query($storeTokenSql);
              if ($storeResult) {
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
    $removeTokenSql = 'UPDATE `user` u SET `token`=\'\' WHERE u.name = \'' . $input['userOrEmail'] . '\' OR u.email = \'' . $input['userOrEmail'] . '\'';
    $removeTokenSql = $dbWeb->query($removeTokenSql);
    if ($removeTokenSql) {
      die(json_encode(array('status' => STATUS_SUCCESS), JSON_NUMERIC_CHECK));
    } else {
      die(json_encode(array('status' => STATUS_ERROR, 'code' => '500', 'message' => 'logout-error')));
    }

    break;
  }
}

$dbLanguage->close();
