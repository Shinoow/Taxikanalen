<?php
case "bokaLedigTid":

            session_start();

            $bilnummer = $_POST['id'];
            $tid = $_POST['tid'];
            $dag = $_POST['dag'];
            $typ = $_POST['typ'];

            try {
                $conn = connect();

                $stmt = $conn->query("SELECT REDACTED FROM REDACTED WHERE REDACTED='" . $_SESSION['REDACTED'] . "' AND REDACTED='$dag' AND REDACTED='$tid' AND REDACTED='$bilnummer' AND REDACTED='$typ' AND REDACTED='" . $_SESSION['REDACTED'] . "' AND REDACTED='0'");

                $finnsredan = false;

                if ($stmt->fetchColumn() > 0) {
                    if ($stmt->fetchColumn() > 1) { //Rensar duplicerade pass
                        $conn->exec("DELETE FROM REDACTED WHERE REDACTED='" . $_SESSION['REDACTED'] . "' AND REDACTED='$dag' AND REDACTED='$tid' AND REDACTED='$bilnummer' AND REDACTED='$typ' AND REDACTED='" . $_SESSION['REDACTED'] . "' AND REDACTED='0'");
                    } else {
                        $finnsredan = true;
                        $data["status"] = 0;
                        $data["msg"] = "Du är redan bokad till passet $dag $tid!";
                    }
                }

                if (!$finnsredan) {

                    $stmt1 = $conn->query("SELECT REDACTED, REDACTED FROM REDACTED WHERE REDACTED='" . $_SESSION['REDACTED'] . "' AND REDACTED='$dag' AND REDACTED='" . $_SESSION['REDACTED'] . "'");

                    $things = $stmt1->fetch();
                    if ($things > 0) {
                        $data["status"] = 0;
                        $data["msg"] = "Du är redan bokad för bil " . $things["REDACTED"] . " till ett annat pass $dag " . $things["REDACTED"] . "!";
                    } else {

                        $conn->exec("INSERT INTO REDACTED(REDACTED, REDACTED, REDACTED, REDACTED, REDACTED, REDACTED) VALUES('" . $_SESSION['REDACTED'] . "', '$dag', '$tid', '$bilnummer', '$typ', '" . $_SESSION['REDACTED'] . "')");

                        $query2 = $conn->prepare("SELECT REDACTED, REDACTED FROM REDACTED WHERE REDACTED='" . $REDACTED['REDACTED'] . "' AND REDACTED='" . $_SESSION['REDACTED'] . "'");
                        $query2->execute();
                        $result2 = $query2->fetch();
                        $dagforare = $result2["REDACTED"] . " " . $result2["REDACTED"];

                        $data["namn"] = $dagforare . "   " . $tid;
                        $data["id"] = $_SESSION["REDACTED"];
                        $data["status"] = 1;
                        $data["msg"] = "Tid bokad!";
                        loggaAktivitet($conn, "Föraren har bokat passet <strong>$dag $tid</strong> för bil <strong>$bilnummer</strong>!");
                        updateRefreshTime($conn, 'REDACTED', $_SESSION['REDACTED']);
                        updateRefreshTime($conn, 'REDACTED', $_SESSION['REDACTED']);
                    }
                }
            } catch (PDOException $e) {
                logError(currentUrlAJAX, $_POST, __LINE__, __FILE__, "Error: Connection failed: " . $e->getMessage());
                $data["status"] = 0;
                $data["msg"] = "Connection failed: " . $e->getMessage();
            }

            $conn = null;

            echo json_encode($data);
            break;