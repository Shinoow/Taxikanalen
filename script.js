$(function() {
    var b = $("body");
  
    function loadallstuff() {
  
      navigator.browserSpecs = (function() {
        var ua = navigator.userAgent,
          tem,
          M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
          tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
          return {
            name: 'IE',
            version: (tem[1] || '')
          };
        }
        if (M[1] === 'Chrome') {
          tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
          if (tem != null) return {
            name: tem[1].replace('OPR', 'Opera'),
            version: tem[2]
          };
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null)
          M.splice(1, 1, tem[1]);
        return {
          name: M[0],
          version: M[1]
        };
      })();
  
      var title = $(getid("browsertitle")),
        logo = $(getid("browserimage")),
        text = $(getid("browsertext")),
        knapp = $(getid("browserlink")),
        browsercontainer = $(getid("oldbrowser")),
        currentpage = location.href,
        version = navigator.browserSpecs.version;
  
      switch (navigator.browserSpecs.name) {
        case "Firefox":
          if (version < 61) {
            browsercontainer.addClass("firefox");
            if (currentpage.indexOf("forare") > -1 || currentpage.indexOf("admin") > -1) {
              logo.attr({
                "src": "../images/firefox_logo.png",
                "alt": "Firefox Logotyp"
              });
            } else {
              logo.attr({
                "src": "images/firefox_logo.png",
                "alt": "Firefox Logotyp"
              });
            }
            title.text("Utdaterad Firefox");
            text.text("Din Firefox version: " + version + " är utdaterad. \n Uppdatera Firefox nu för en bättre upplevelse");
            knapp.attr("href", "https://www.mozilla.org/sv-SE/firefox/new/");
          }
          break;
        case "Chrome":
          if (version < 68) {
            browsercontainer.addClass("chrome");
            if (currentpage.indexOf("forare") > -1 || currentpage.indexOf("admin") > -1) {
              logo.attr({
                "src": "../images/chrome_logo.webp",
                "alt": "Chrome Logotyp"
              });
            } else {
              logo.attr({
                "src": "images/chrome_logo.webp",
                "alt": "Chrome Logotyp"
              });
            }
            title.text("Utdaterad Chrome");
            text.text("Din Chrome version: " + version + " är utdaterad. \n Uppdatera Chrome nu för en bättre upplevelse");
            knapp.attr("href", "https://www.google.com/chrome/");
          }
          break;
        case "Opera":
          if (version < 55) {
            browsercontainer.addClass("opera");
            if (currentpage.indexOf("forare") > -1 || currentpage.indexOf("admin") > -1) {
              logo.attr({
                "src": "../images/opera_logo.png",
                "alt": "Opera Logotyp"
              });
            } else {
              logo.attr({
                "src": "images/opera_logo.png",
                "alt": "Opera Logotyp"
              });
            }
            title.text("Utdaterad Opera");
            text.text("Din Opera version: " + version + " är utdaterad. \n Uppdatera Opera nu för en bättre upplevelse");
            knapp.attr("href", "https://www.opera.com/sv");
          }
          break;
        case "Edge":
          if (version < 17) {
            browsercontainer.addClass("edge");
            if (currentpage.indexOf("forare") > -1 || currentpage.indexOf("admin") > -1) {
              logo.attr({
                "src": "../images/edge_logo.png",
                "alt": "Edge Logotyp"
              });
            } else {
              logo.attr({
                "src": "images/edge_logo.png",
                "alt": "Edge Logotyp"
              });
            }
            title.text("Utdaterad Edge");
            text.text("Din Edge version: " + version + " är utdaterad. \n Uppdatera Edge nu för en bättre upplevelse");
            knapp.attr("href", "https://www.microsoft.com/sv-se/windows/microsoft-edge");
          }
          break;
        default:
          console.log("Error: Hittar inte vilken typ av webbläsare");
      }
  
      //Remember me
      if (getid("login_page")) {
        setTimeout(function() {
          if (localStorage.chkbx && localStorage.chkbx != "") {
            $(getid("RememberMe")).attr("checked", "checked");
            $(getid("username")).val(localStorage.usrname);
            $(getid("pass")).val(localStorage.pass);
            $(getid("loginselect")).val(localStorage.foretag);
          } else {
            $(getid("RememberMe")).removeAttr("checked").selected = "true";
            $(getid("username")).val("");
            $(getid("pass")).val("");
          }
  
          $(getid("RememberMe")).on("click", function() {
  
            if ($(getid("RememberMe")).is(":checked")) {
              // save username and password
              localStorage.usrname = $(getid("username")).val();
              localStorage.pass = $(getid("pass")).val();
              localStorage.chkbx = $(getid("RememberMe")).val();
              localStorage.foretag = $(getid("loginselect")).val();
            } else {
              localStorage.usrname = "";
              localStorage.pass = "";
              localStorage.chkbx = "";
              localStorage.foretag = "";
            }
          });
        }, 500);
      }
  
      var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
      if (isIE11) {
        alert("Taxikanalen använder avancerade funktioner som internet explorer inte stödjer, vi rekommenderar därför att använda en nyare webbläsare som tex Chrome eller Firefox.");
      }
  
      processQS();
  
      window.onhashchange = function() {
        processQS();
      };
  
      $(".message a").on("click", function() {
        $("form").animate({
          height: "toggle",
          opacity: "toggle"
        }, "slow");
      });
      $(".menu_vy_click").on("click", function() {
        $(".menu_list").animate({
          height: "toggle",
          opacity: "toggle"
        }, "slow");
      });
  
      $(".hamburger").on("click", function() {
        b.toggleClass("js-menu_activated");
      });
      $(".menulink").on("click", function() {
        b.removeClass("js-menu_activated");
        if ($(this).hasClass("selected")){
          refresh_tab($(this).attr("id"));
          getid($(this).data('id')).style.display = "none";
          getid($(this).data('id')).classList.remove("fadein");
          setTimeout(() => {
            $(getid($(this).data('id'))).addClass("fadein");
          }, 100);
        }
      });
      $(".sidenav>a").on("click", function() {
        if ($(this).hasClass("selected") && !$(this).hasClass("clickable")){
          refresh_tab($(this).attr("id"));
          getid($(this).data('id')).style.display = "none";
          getid($(this).data('id')).classList.remove("fadein");
          setTimeout(() => {
            $(getid($(this).data('id'))).addClass("fadein");
          }, 100);
          if(getid('btn_massmail').classList.contains('selected')){
            getid('btn_massmail').classList.remove('selected');
            toggle_visibility('dialog_box_massmail');
          }
        }
      });
  
      var main = getid("main"),
        navbarheight = $(getid("navbar")).height(),
        fixedheight = "calc(100% - " + navbarheight + "px)";
      $(main).css("height", fixedheight);
  
      $(getid("problemform")).submit(function() {
        var sendbutton = getid("problemknapp"),
          formData = new FormData(this),
          filer = getid("fil").files,
          nFiles = filer.length;
        $(sendbutton).prop("disabled", true);
        for (var nFileId = 0; nFileId < nFiles; nFileId++) {
          var fil = filer[nFileId],
            namn = fil.name.slice((fil.name.lastIndexOf(".") - 1 >>> 0) + 2);
          if (namn === "jpg" || namn === "jpeg" || namn === "png") {
            if (fil.size >= 5254880) {
              felMeddelande("Bilden är för stor! Du kan endast ladda upp bilder mindre än 5MB.");
              $(sendbutton).prop("disabled", false);
              return false;
            }
          } else {
            felMeddelande("Du kan endast ladda upp bilder i formaten .jpg och .png");
            $(sendbutton).prop("disabled", false);
            return false;
          }
        }
        simpleAjax("../platform/problemrapport.php", formData, sendbutton, "Just nu håller jag på att jobba! (kod #001)", function(data) {
          meddelande("", data.msg);
          toggle_visibility("contact_form");
          $("#contact_form form")[0].reset();
        });
  
        return false;
      });
  
      $(getid("driver_login")).submit(function() {
        var sendbutton = getid("loggainknapp"),
          formData = new FormData(this);
        $(sendbutton).prop("disabled", true);
        formData.append("sida", "forare");
  
        handleLogin("./platform/login.php", formData, "#?id=btn_bilar", "Just nu håller jag på att jobba! (kod #002)", sendbutton);
  
        return false;
      });
  
      $(getid("registreraforare")).submit(function() {
        var formData = new FormData(this),
          sendbutton = getid('registreraforareknapp');
        $(sendbutton).prop("disabled", true);
        formData.append('action', 'registreraForare');
  
        $(getid("popuprubrik")).text("Stämmer uppgifterna?");
        $(getid("popup")).show();
        $(getid('popupja')).one("click", function() {
          $(sendbutton).prop("disabled", false);
          var knapp = $(this),
            str = $(getid("personnummer_reg")).val(),
            str1 = $(getid("email_reg")).val();
          $(knapp).prop("disabled", true);
          if (str.match("^19") && str.split("-").length === 2) {
            if (validateEmail(str1)) {
              simpleAjax("./platform/ajax.php", formData, knapp, "Just nu håller jag på att jobba! (kod #003)", function(data) {
                meddelande("", data.msg);
                if (data.status === 1) {
                  toggle_visibility("dialog_box_forare");
                  $("#dialog_box_forare form")[0].reset();
                  refresh_tab('btn_forare');
                }
              });
            } else {
              felMeddelande("Var vänlig fyll i en giltig e-postadress");
              $(knapp).prop("disabled", false);
            }
  
          } else {
            felMeddelande("Var vänlig fyll i ett giltigt personnummer");
            $(knapp).prop("disabled", false);
          }
          $(getid("popup")).hide();
        });
        $(getid("popupnej")).one("click", function() {
          $(getid('popupja')).off();
          $(sendbutton).prop("disabled", false);
          $(getid("popup")).hide();
        });
  
        return false;
      });
  
      $(getid("admin_login")).submit(function() {
        var sendbutton = getid("loggainknapp"),
          formData = new FormData(this);
        $(sendbutton).prop("disabled", true);
        formData.append("sida", "admin");
  
        handleLogin("../platform/login.php", formData, "#?id=btn_hem", "Just nu håller jag på att jobba! (kod #004)", sendbutton);
  
        return false;
      });
  
      $(getid("registrerabil")).submit(function() {
        var formData = new FormData(this),
          sendbutton = getid('registrerabilknapp');
        $(sendbutton).prop("disabled", true);
        formData.append('action', 'registreraBil');
        $(getid("popuprubrik")).text("Stämmer uppgifterna?");
        $(getid("popup")).show();
        $(getid('popupja')).one("click", function() {
          $(sendbutton).prop("disabled", false);
          var knapp = $(this);
          $(knapp).prop("disabled", true);
          simpleAjax("./platform/ajax.php", formData, knapp, "Just nu håller jag på att jobba! (kod #005)", function(data) {
            meddelande("", data.msg);
            if (data.status === 1) {
              toggle_visibility("dialog_box_bilar");
              $("#dialog_box_bilar form")[0].reset();
              refresh_tab('btn_bilar');
            }
          });
          $(getid("popup")).hide();
        });
        $(getid("popupnej")).one("click", function() {
          $(getid('popupja')).off();
          $(sendbutton).prop("disabled", false);
          $(getid("popup")).hide();
        });
  
        return false;
      });
  
      $(getid("redigerabil")).submit(function() {
        var formData = new FormData(this),
          sendbutton = getid('redigerabilknapp');
        $(sendbutton).prop('disabled', true);
        formData.append("bil_nr", $(this).data("id"));
        formData.append('action', 'redigeraBil');
        $(getid("popuprubrik")).text("Stämmer uppgifterna?");
        $(getid("popup")).show();
        $(getid('popupja')).one("click", function() {
          $(sendbutton).prop('disabled', false);
          var knapp = $(this);
          $(knapp).prop("disabled", true);
          simpleAjax("./platform/ajax.php", formData, knapp, "Just nu håller jag på att jobba! (kod #006)", function(data) {
            meddelande("", data.msg);
            if (data.status === 1) {
              toggle_visibility("dialog_box_bilar_1");
              refresh_tab('btn_bilar');
            }
          });
          $(getid("popup")).hide();
        });
        $(getid("popupnej")).one("click", function() {
          $(getid('popupja')).off();
          $(sendbutton).prop('disabled', false);
          $(getid("popup")).hide();
        });
  
        return false;
      });
  
      $(getid("raderabilknapp")).on("click", function() {
        var sendbutton = this;
        $(sendbutton).prop('disabled', true);
        $(getid("popuprubrik")).text("Är du säker på att du vill radera bil " + $(getid("redigerabil")).data("id") + "?");
        $(getid("popup")).show();
        $(getid('popupja')).one("click", function() {
          $(sendbutton).prop('disabled', false);
          var knapp = $(this);
          $(knapp).prop("disabled", true);
          simpleAjax("./platform/ajax.php", {
            action: "raderaBil",
            bil_nr: $(getid("redigerabil")).data("id")
          }, knapp, "Just nu håller jag på att jobba! (kod #007)", function(data) {
            meddelande("", data.msg);
            if (data.status === 1) {
              toggle_visibility("dialog_box_bilar_1");
              refresh_tab('btn_bilar');
            }
          });
          $(getid("popup")).hide();
        });
        $(getid("popupnej")).one("click", function() {
          $(getid('popupja')).off();
          $(sendbutton).prop('disabled', false);
          $(getid("popup")).hide();
        });
      });
  
      $(getid("raderaforareknapp")).on("click", function() {
        var sendbutton = this;
        $(sendbutton).prop('disabled', true);
        $(getid("popuprubrik")).text("Är du säker på att du vill radera förare " + $(getid("redigeraforare")).data("id") + "?");
        $(getid("popup")).show();
        $(getid('popupja')).one("click", function() {
          $(sendbutton).prop('disabled', false);
          var knapp = $(this);
          $(knapp).prop("disabled", true);
          simpleAjax("./platform/ajax.php", {
            action: "raderaForare",
            id: $(getid("redigeraforare")).data("id")
          }, knapp, "Just nu håller jag på att jobba! (kod #008)", function(data) {
            meddelande("", data.msg);
            if (data.status === 1) {
              toggle_visibility("dialog_box_forare_1");
              refresh_tab('btn_forare');
            }
          });
          $(getid("popup")).hide();
        });
        $(getid("popupnej")).one("click", function() {
          $(getid('popupja')).off();
          $(sendbutton).prop('disabled', false);
          $(getid("popup")).hide();
        });
      });
  
      $(getid("redigeraforare")).submit(function() {
        var formData = new FormData(this),
          sendbutton = getid('redigeraforareknapp');
        $(sendbutton).prop('disabled', true);
        formData.append("id", $(this).data("id"));
        formData.append("action", "redigeraForare");
        $(getid("popuprubrik")).text("Stämmer uppgifterna?");
        $(getid("popup")).show();
        $(getid('popupja')).one("click", function() {
          $(sendbutton).prop('disabled', false);
          var knapp = $(this);
          $(knapp).prop("disabled", true);
          simpleAjax("./platform/ajax.php", formData, knapp, "Just nu håller jag på att jobba! (kod #009)", function(data) {
            meddelande("", data.msg);
            if (data.status === 1) {
              toggle_visibility("dialog_box_forare_1");
              refresh_tab('btn_forare');
            }
          });
          $(getid("popup")).hide();
        });
        $(getid("popupnej")).one("click", function() {
          $(getid('popupja')).off();
          $(sendbutton).prop('disabled', false);
          $(getid("popup")).hide();
        });
  
        return false;
      });
  
      $(getid("skicka_massmail")).submit(function() {
        var sendbutton = getid("skicka_massmail_knapp"),
          formData = new FormData(this);
        $(sendbutton).prop("disabled", true);
  
        formData.append("action", "massmail");
  
        simpleAjax("./platform/ajax.php", formData, sendbutton, "Just nu håller jag på att jobba! (kod #010)", function(data) {
          if (data.status === 1) {
            toggle_visibility("dialog_box_massmail");
            $("#dialog_box_massmail form")[0].reset();
          }
          meddelande("", data.msg);
        });
  
        return false;
      });
  
      $(getid("rapportera_arbetstider")).submit(function() {
        var sendbutton = getid("rapportera_arbetstider_knapp"),
          TableData = [];
        $(sendbutton).prop("disabled", true);
  
  
        $("#table_rapportera_arbetstider>tbody>tr").each(function(row, tr) {
          TableData[row] = {
            "Dag": $(tr).find("td:eq(0)").text(),
            "Bil": $(tr).find("td:eq(1)").text(),
            "SchemalagdTid": $(tr).find("td:eq(2)").text(),
            "ArbetadeTimmar": $(tr).find("td:eq(3) input").val().replace(',', '.'),
            "Avvikelser": $(tr).find("td:eq(4) input").val()
          };
        });
  
        TableData = JSON.stringify(TableData);
  
        simpleAjax("./platform/ajax.php", {
          action: "rapporteraArbetstid",
          json: TableData
        }, sendbutton, "Just nu håller jag på att jobba! (kod #011)", function(data) {
          if (data.status === 1) {
            $("#table_rapportera_arbetstider tbody").empty();
            refresh_tab('btn_rapportera_arbetstider');
          } else felMeddelande(data.msg);
        });
  
        return false;
      });
  
      $(getid("skapa_schema_form")).submit(function() {
        var formData = new FormData(this),
          sendbutton = getid('skapa_schema_knapp'),
          dagpass = $('#dropdown_forare option:selected').val(),
          nattpass = $('#dropdown_forare_2 option:selected').val();
        $(sendbutton).prop('disabled', true);
        formData.append("action", "skapaSchema");
        if ((dagpass != -1 && nattpass == -1) || (dagpass == -1 && nattpass != -1)) {
          $(getid("popuprubrik")).text('Du har inte valt en förare för ' + (dagpass == -1 ? 'dagpass' : 'nattpass') + ', skapa schema ändå?');
          $(getid("popup")).show();
          $(getid('popupja')).one("click", function() {
            $(sendbutton).prop('disabled', false);
            var knapp = $(this);
            $(knapp).prop("disabled", true);
            simpleAjax("./platform/ajax.php", formData, knapp, "Just nu håller jag på att jobba! (kod #048)", function(data) {
              meddelande("", data.msg);
              if (data.status === 1) {
                switch_tab("schema");
                $("#skapa_schema form")[0].reset();
              }
            });
            $(getid("popup")).hide();
          });
        } else {
          $(getid("popuprubrik")).text("Stämmer uppgifterna?");
          $(getid("popup")).show();
          $(getid('popupja')).one("click", function() {
            $(sendbutton).prop('disabled', false);
            var knapp = $(this);
            $(knapp).prop("disabled", true);
            simpleAjax("./platform/ajax.php", formData, knapp, "Just nu håller jag på att jobba! (kod #012)", function(data) {
              meddelande("", data.msg);
              if (data.status === 1) {
                switch_tab("schema");
                $("#skapa_schema form")[0].reset();
              }
            });
            $(getid("popup")).hide();
          });
        }
        $(getid("popupnej")).one("click", function() {
          $(sendbutton).prop('disabled', false);
          $(getid('popupja')).off();
          $(getid("popup")).hide();
        });
  
        return false;
      });
  
      $(getid("spara_standardtider_form")).submit(function() {
        var sendbutton = getid("spara_standardtider_knapp"),
          formData = new FormData(this);
        $(sendbutton).prop("disabled", true);
        formData.append("action", "setStandardtider");
        simpleAjax("./platform/ajax.php", formData, sendbutton, "Just nu håller jag på att jobba! (kod #013)", function(data) {
          meddelande("", data.msg);
        });
  
        return false;
      });
  
      $(getid("pw_reset")).submit(function() {
        var sendbutton = getid("pw_reset_knapp"),
          formData = new FormData(this);
        $(sendbutton).prop("disabled", true);
        formData.append("action", "resetPassword");
        simpleAjax("./platform/ajax.php", formData, sendbutton, "Just nu håller jag på att jobba! (kod #014)", function(data) {
          alert(data.msg);
          if (data.status === 1) {
            $(getid("pw_reset"))[0].reset();
          }
        });
  
        return false;
      });
  
      $(getid("pw_reset_form")).submit(function() {
        var sendbutton = getid("pw_reset_form_knapp"),
          formData = new FormData(this);
        $(sendbutton).prop("disabled", true);
        formData.append("code", location.search.substring(1));
        formData.append("action", "processPwReset");
        simpleAjax("./platform/ajax.php", formData, sendbutton, "Just nu håller jag på att jobba! (kod #015)", function(data) {
          alert(data.msg);
          if (data.status === 1) {
            $(getid("pw_reset_form"))[0].reset();
            $(location).attr("href", data.url);
          }
        });
  
        return false;
      });
  
      $(getid("bokapass_form")).submit(function() {
        var formData = new FormData(this),
          dialog = $(getid("dialog_box"));
        formData.append("action", "bokaPass");
        formData.append("tid", dialog.data("tid"));
        formData.append("dag", dialog.data("dag"));
        formData.append("bil", dialog.data("bil"));
        formData.append("pass", dialog.data("typ"));
  
        $(getid("popuprubrik")).text("Stämmer uppgifterna?");
        $(getid("popup")).show();
        $(getid('popupja')).one("click", function() {
          var knapp = $(this);
          $(knapp).prop("disabled", true);
          simpleAjax("./platform/ajax.php", formData, knapp, "Just nu håller jag på att jobba! (kod #016)", function(data) {
            meddelande("", data.msg);
            if (data.status === 1) {
              toggle_visibility("dialog_box");
              $("#table_view_schema>tbody>tr").find(dialog.data("td")).each(function() {
                var td = $(this),
                  dag = $(this).parent("tr").find("td:eq(1)").data("id"),
                  tid = $(td).data("tid");
                if (dag === dialog.data("dag")) {
                  $(td).text($("#dropdown_forare_4 option:selected").text() + "   " + tid);
                  $(td).data("id", $("#dropdown_forare_4 option:selected").val());
                  $(td).css("color", "var(--Red)");
                }
              });
              $("#bokapass_form")[0].reset();
            }
          });
          $(getid("popup")).hide();
        });
        $(getid("popupnej")).one("click", function() {
          $(getid('popupja')).off();
          $(getid("popup")).hide();
        });
  
        return false;
      });
  
      $(getid("bytpass")).submit(function() {
        var formData = new FormData(this),
          dialog = $(getid("dialog_box_1"));
        formData.append("action", "bytPass");
        formData.append("tid", dialog.data("tid"));
        formData.append("dag", dialog.data("dag"));
        formData.append("forar_id", dialog.data("forar_id"));
        formData.append("bil", dialog.data("bil"));
        formData.append("typ", dialog.data("typ"));
  
        $(getid("popuprubrik")).text("Stämmer uppgifterna?");
        $(getid("popup")).show();
        $(getid('popupja')).one("click", function() {
          var knapp = $(this);
          $(knapp).prop("disabled", true);
          simpleAjax("./platform/ajax.php", formData, knapp, "Just nu håller jag på att jobba! (kod #017)", function(data) {
            meddelande("", data.msg);
            if (data.status === 1) {
              toggle_visibility("dialog_box_1");
              if (data.alla) {
                processSchemabyte("td:eq(2)", dialog.data("forar_id"));
                processSchemabyte("td:eq(3)", dialog.data("forar_id"));
              } else {
                processSchemabyte(dialog.data("td"), dialog.data("forar_id"), dialog.data("dag"));
              }
              $("#bytpass")[0].reset();
            }
          });
          $(getid("popup")).hide();
        });
        $(getid("popupnej")).one("click", function() {
          $(getid('popupja')).off();
          $(getid("popup")).hide();
        });
  
        return false;
      });
  
      $(getid("forarinstallningar")).submit(function() {
        var formData = new FormData(this);
        formData.append('action', 'sparaInstallningar');
  
        $(getid("popuprubrik")).text("Spara inställningar");
        $(getid("popupmessage")).text("Är du säker på att du vill spara dem här ändringarna?");
        $(getid("popup")).show();
        $(getid('popupja')).one("click", function() {
          var knapp = $(this);
          $(knapp).prop("disabled", true);
          simpleAjax("./platform/ajax.php", formData, knapp, "Just nu håller jag på att jobba! (kod #018)", function(data) {
            meddelande("Spara inställningar", data.msg);
            if (data.status === 1) {
              $("#forarinstallningar")[0].reset();
              if (data.adress.length > 0)
                $(getid("installningar_adress")).text(data.adress);
              if (data.email.length > 0)
                $(getid("installningar_email")).text(data.email);
              if (data.tel_nr.length > 0)
                $(getid("installningar_telenr")).text(data.tel_nr);
              if (data.anh_tel_nr.length > 0)
                $(getid("installningar_anhorig_telenr")).text(data.anh_tel_nr);
            }
          });
          $(getid("popup")).hide();
        });
        $(getid("popupnej")).one("click", function() {
          $(getid('popupja')).off();
          $(getid("popup")).hide();
        });
  
        return false;
      });
  
      $(getid("admininstallningar")).submit(function() {
        var formData = new FormData(this);
        formData.append("action", "sparaInstallningar");
  
        $(getid("popuprubrik")).text("Stämmer uppgifterna?");
        $(getid("popup")).show();
        $(getid('popupja')).one("click", function() {
          var knapp = $(this);
          $(knapp).prop("disabled", true);
          simpleAjax("./platform/ajax.php", formData, knapp, "Just nu håller jag på att jobba! (kod #019)", function(data) {
            meddelande("", data.msg);
            if (data.status === 1) {
              $("#admininstallningar")[0].reset();
            }
          });
          $(getid("popup")).hide();
        });
        $(getid("popupnej")).one("click", function() {
          $(getid('popupja')).off();
          $(getid("popup")).hide();
        });
  
        return false;
      });
  
      b.on('submit', '.rapporterad_arbetstid', function() {
        var sendbutton = $(this).children(".button_klocka"),
          TableData = [],
          form = $(this);
        $(sendbutton).prop("disabled", true);
  
  
        TableData[0] = {
          'Num': form.find('.input_num').val(),
          'Id': form.find('.input_id').val(),
          'Dag': form.find('.input_dag').val(),
          'Bil': form.find('.input_bil').val(),
          'SchemalagdTid': form.find('.input_tid').val(),
          'ArbetadeTimmar': form.find('.input_text').val().replace(',', '.')
        };
  
        TableData = JSON.stringify(TableData);
  
        simpleAjax("./platform/ajax.php", {
          action: "godkannArbetstid",
          json: TableData
        }, sendbutton, "Just nu håller jag på att jobba! (kod #020)", function(data) {
          if (data.status === 1) {
            refresh_tab('btn_hem');
          } else felMeddelande(data.msg);
        });
  
        return false;
      });
  
      $(getid("exportera_tider")).submit(function() {
        var val1 = $(getid("dropdown_forare_5")).val(),
          val2 = $(getid("dropdown_manad")).val(),
          val3 = $("#dropdown_forare_5 option:selected").text();
  
        if (isEmpty(val2)) {
          felMeddelande("Var vänlig välj en månad!");
        } else {
          jQuery("<form action=\"./platform/ajax.php\" method=\"post\"><input type=\"hidden\" name=\"action\" value=\"arbetstidPDF\"/><input type=\"hidden\" name=\"valjforare\" value=\"" + val1 + "\"/><input type=\"hidden\" name=\"valjmanad\" value=\"" + val2 + "\"/><input type=\"hidden\" name=\"namn\" value=\"" + val3 + "\"/></form>")
            .appendTo('body').submit().remove();
        }
  
        return false;
      });
  
      $(getid("rensadata")).submit(function() {
        var sendbutton = getid("rensadata_knapp");
        $(sendbutton).prop("disabled", true);
  
        simpleAjax("./platform/ajax.php", {
          action: "rensaData"
        }, sendbutton, "Just nu håller jag på att jobba! (kod #021)", function(data) {
          meddelande("", data.msg);
        });
  
        return false;
      });
  
      $(getid("avboka_pass")).submit(function() {
        var formData = new FormData(this),
          dialog = $(getid("dialog_box_1"));
        formData.append("action", "avbokaPass");
        formData.append("tid", dialog.data("tid"));
        formData.append("dag", dialog.data("dag"));
        formData.append("bil", dialog.data("bil"));
        formData.append("typ", dialog.data("typ"));
  
        $(getid("popuprubrik")).text("Avboka pass?");
        $(getid("popupmessage")).text("Är du säker på att du vill avboka passet?");
        $(getid("popup")).show();
        $(getid('popupja')).one("click", function() {
          var knapp = $(this);
          $(knapp).prop("disabled", true);
          simpleAjax("./platform/ajax.php", formData, knapp, "Just nu håller jag på att jobba! (kod #044)", function(data) {
            meddelande("Avboka pass", data.msg);
            if (data.status === 1) {
              toggle_visibility("dialog_box_1");
              $("#table_view_schema>tbody>tr").find(dialog.data("td")).each(function() {
                var td = $(this);
                if ($(td).data("id") === dialog.data("forar_id")) {
                  var dag = $(this).parent("tr").find("td:eq(1)").data("id"),
                    tid = $(td).data("tid");
                  if (dag === dialog.data("dag")) {
                    $(td).text("Boka   " + tid);
                    $(td).data("id", 0);
                    $(td).css("color", "var(--Green)");
                  }
                }
              });
            }
          });
          $(getid("popup")).hide();
        });
        $(getid("popupnej")).one("click", function() {
          $(getid('popupja')).off();
          $(getid("popup")).hide();
        });
  
        return false;
      });
  
      $(getid("exportera_statistik")).submit(function() {
        var val1 = $(getid("dropdown_forare_7")).val(),
          val2 = $(getid("dropdown_manad_1")).val(),
          val3 = $("#dropdown_forare_7 option:selected").text();
  
        if (isEmpty(val2)) {
          felMeddelande("Var vänlig välj en månad!");
        } else {
          jQuery("<form action=\"./platform/ajax.php\" method=\"post\"><input type=\"hidden\" name=\"action\" value=\"statistikPDF\"/><input type=\"hidden\" name=\"valjforare\" value=\"" + val1 + "\"/><input type=\"hidden\" name=\"valjmanad\" value=\"" + val2 + "\"/><input type=\"hidden\" name=\"namn\" value=\"" + val3 + "\"/></form>")
            .appendTo('body').submit().remove();
        }
  
        return false;
      });
  
      b.on("click", ".redigeraforare", function() {
        var row = $(this).parents("tr"),
          id = row.find("td:eq(0)").text(),
          namn = row.find("td:eq(1)").text(),
          efternamn = row.find("td:eq(2)").text(),
          personnummer = row.find("td:eq(3)").text(),
          adress = row.data("adress"),
          mail = row.find("td:eq(4)").text(),
          tel = row.find("td:eq(5)").text(),
          anh_tel = row.data("anh");
        $(getid("dialog_box_forare_1")).find("h2").text("Redigera förare " + id + ":");
        $(getid("redigera_fnamn")).val(namn);
        $(getid("redigera_enamn")).val(efternamn);
        $(getid("redigera_fnum")).val(id);
        $(getid("redigera_pnum")).val(personnummer);
        $(getid("redigera_adress")).val(adress);
        $(getid("redigera_mail")).val(mail);
        $(getid("redigera_tel_nr")).val(tel);
        $(getid("redigera_anh_tel_nr")).val(anh_tel);
        $(getid("redigeraforare")).data("id", id);
        toggle_visibility("dialog_box_forare_1");
      });
  
      b.on("click", ".redigerabil", function() {
        var row = $(this).parents("tr"),
          bil = row.find("td:eq(0)").text(),
          plats = row.find("td:eq(1)").text(),
          nycklar = row.find("td:eq(2)").text(),
          nycklar_1 = row.find("td:eq(3)").text(),
          anteckning = row.find("td:eq(4)").text();
        $(getid("dialog_box_bilar_1")).find("h2").text("Redigera bil " + bil + ":");
        $(getid("redigera_bil_nummer")).val(bil);
        $(getid("redigera_bil_plats")).val(plats);
        $(getid("redigera_nycklar_plats")).val(nycklar);
        $(getid("redigera_nycklar_plats_1")).val(nycklar_1);
        $(getid("redigera_anteckning")).val(anteckning);
        $(getid("redigerabil")).data("id", bil);
        toggle_visibility("dialog_box_bilar_1");
      });
  
      b.on("change", ".checkbox_forare", function() {
        var checkbox = $(this),
          checked = this.checked ? 1 : 0,
          row = $(this).parents("tr"),
          id = row.find("td:eq(0)").text();
  
        if (checked == 0) {
          simpleAjax("./platform/ajax.php", {
            action: "harAktivaPass",
            id: id
          }, null, "Just nu håller jag på att jobba! (kod #046)", function(data) {
            if (data.status === 1) {
              if (data.aktivapass) {
                $(getid("popuprubrik")).text("Den här föraren är schemalagt på bil " + data.aktivapass + ", vill du fortsätta?");
                $(getid("popup")).show();
                $(getid('popupja')).one("click", function() {
                  var knapp = $(this);
                  $(knapp).prop("disabled", true);
                  simpleAjax("./platform/ajax.php", {
                    action: "andraForare",
                    aktiverad: checked,
                    id: id
                  }, knapp, "Just nu håller jag på att jobba! (kod #036)", function(data) {
                    if (data.status !== 1) {
                      felMeddelande(data.msg);
                    }
                  });
                  $(getid("popup")).hide();
                });
                $(getid("popupnej")).one("click", function() {
                  $(getid('popupja')).off();
                  $(checkbox).prop("checked", true);
                  $(getid("popup")).hide();
                });
              } else {
                simpleAjax("./platform/ajax.php", {
                  action: "andraForare",
                  aktiverad: checked,
                  id: id
                }, null, "Just nu håller jag på att jobba! (kod #047)", function(data) {
                  if (data.status !== 1) {
                    felMeddelande(data.msg);
                  }
                });
              }
            }
          });
        } else {
          simpleAjax("./platform/ajax.php", {
            action: "andraForare",
            aktiverad: checked,
            id: id
          }, null, "Just nu håller jag på att jobba! (kod #045)", function(data) {
            if (data.status !== 1) {
              felMeddelande(data.msg);
            }
          });
        }
      });
  
      b.on("change", ".checkbox_dispens", function() {
        var checked = this.checked ? 1 : 0,
          row = $(this).parents("tr"),
          year = row.find("td:eq(0)").text(),
          id = row.find("td:eq(1)").text();
  
        simpleAjax("./platform/ajax.php", {
          action: "andraDispens",
          beviljat: checked,
          id: id,
          year: year
        }, null, "Just nu håller jag på att jobba! (kod #032)", function(data) {
          if (data.status !== 1) {
            felMeddelande(data.msg);
          }
        });
      });
  
      b.on("click", ".seschema", function() {
        var row = $(this).parents("tr"),
          id = row.find("td:eq(0)").text(),
          text = "Schema för: " + row.find("td:eq(1)").text() + " " + row.find("td:eq(2)").text();
        simpleAjax("./platform/ajax.php", {
          action: "getSchemaForForare",
          id: id
        }, null, "Just nu håller jag på att jobba! (kod #022)", function(data) {
          if (data.status === 1) {
            $("#table_schema_admin tbody").empty();
            var content = '';
              data.content.forEach(element => {
                content += '<tr data-id="'+element.manad+'" class="content_row">'
                + '<td data-title="Vecka">'+element.vecka+'</td>'
                + '<td data-title="Dag">'+element.dag+'</td>'
                + '<td data-title="Ramtid">'+element.tid+'</td>'
                + '<td data-title="Bil">'+element.bilnummer+'</td>'
                + '<td data-title="Plats">'+element.plats+'</td>'
                + '<td data-title="Nycklarna finns">'+element.nycklar+'</td></tr>';
              });
            $("#table_schema_admin tbody").append(content);
            $("#container_schema h2").text(text);
            $(getid("container_schema")).show();
          }
        });
      });
  
      b.on("change", "#dropdown_forare", function() {
  
        var namn = $(this).find("option:selected").text();
        if (namn !== "Välj förare")
          $(getid("dagpassnamn")).text("Dagpass (" + namn + ")");
        else $(getid("dagpassnamn")).text("Dagpass");
  
      });
  
      b.on("change", "#dropdown_forare_2", function() {
  
        var namn = $(this).find("option:selected").text();
        if (namn !== "Välj förare")
          $(getid("nattpassnamn")).text("Nattpass (" + namn + ")");
        else $(getid("nattpassnamn")).text("Nattpass");
  
      });
  
      b.on("change", "#dropdown_bilar", function() {
  
        var id = $(this).find("option:selected").val();
        if (!isEmpty(id)) {
          setTimeout(() => {
            simpleAjax("./platform/ajax.php", {
              action: "getBilSchemaStatus",
              id: id
            }, null, "Just nu håller jag på att jobba! (kod #049)", function(data) {
              if (data.status === 1) {
                if (data.dag && data.dag1) {
                  $(getid("bilvarning")).text("Det finns ett befintligt schema för Bil " + id + " som löper inom intervallet " + data.dag + " - " + data.dag1 + ". Schemat som du skapar nu börjar där det här schemat slutar.");
                  $(getid("bilvarning")).show();
                } else {
                  $(getid("bilvarning")).hide();
                }
              }
            });
          }, 10);
        } else {
          $(getid("bilvarning")).hide();
        }
  
  
      });
  
      b.on("change", "#dropdown_forare_6", function() {
        filterForare(this, 'table_aktivitet', '0');
      });
  
      b.on("change", "#dropdown_statistik", function() {
        filterForare(this, 'table_statistik', '4');
      });
  
      b.on("change", "#dropdown_forare_8", function() {
        filterForare(this, 'table_avvikelser', '0');
      });
  
      b.on("change", ".dropdown_forare_8", function() {
        var val = $(this).val();
        filterForare(this, 'table_overtid_vecka', '2');
        filterForare(this, 'table_overtid_manad', '2');
        filterForare(this, 'table_overtid_ar', '1');
        $('.dropdown_forare_8').val(val);
      });
  
      var isMobile = window.matchMedia("all and (max-width: 1024px)");
  
      if(navigator.browserSpecs.name === 'Chrome'){
        b.on('click','#sortera', function(ev){
          if(ev.offsetY < 0){
            $(this).children(':selected').click();
          }
        });
        if(isMobile.matches){
          b.on('click', '#sortera', function(){
            $(this).val('-1');
          });
          b.on('change','#sortera', function(){
              $(this).children(':selected').click();
          });
        }
      }
  
      setTimeout(function() {
  
        if (getid("loginselect") && getid("loginselect1")) {
          simpleAjax("./platform/ajax.php", {
            action: "getForetag"
          }, null, "Just nu håller jag på att jobba! (kod #023)", function(data) {
            if (data.status === 1){
              var content = '<option value="-1" disabled hidden selected>Välj företag</option>';
              data.content.forEach(element => {
                content += '<option value="'+element.id+'">'+element.namn+'</option>';
              });
              $(getid("loginselect")).append(content);
              $(getid("loginselect1")).append(content);
            }
          });
        }
  
        if (getid("villkor")) {
          setTimeout(() => {
            simpleAjax("./platform/ajax.php", {
              action: "getAccepteratVillkor"
            }, null, "Just nu håller jag på att jobba! (kod #024)", function(data) {
              if (data.status === 1) {
                $(getid("villkor")).show();
                $(getid("acceptera_villkor")).on("click", function() {
                  var knapp = $(this);
                  $(knapp).prop("disabled", true);
                  simpleAjax("./platform/ajax.php", {
                    action: "accepteraVillkor"
                  }, knapp, "Just nu håller jag på att jobba! (kod #024)", function(data) {
                    if (data.status === 1) {
                      $(getid("villkor")).hide();
                    }
                  });
                });
              } else if (data.msg != undefined) {
                felMeddelande(data.msg);
              }
            });
          }, 10);
        }
  
        $(getid("rapportera_arbetstider_knapp_fake")).on("click", function() {
          var button = $(this);
          $(button).prop("disabled", true);
          $(getid("popuprubrik")).text("Rapportera arbetstider");
          $(getid("popupmessage")).text("Bekräfta rapporteringen av dem inskrivna tiderna.");
          $(getid("popup")).show();
          $(getid("popupja")).one("click", function() {
            $(button).prop("disabled", false);
            $(getid("rapportera_arbetstider_knapp")).click();
            $(getid("popup")).hide();
          });
          $(getid("popupnej")).one("click", function() {
            $(button).prop("disabled", false);
            $(getid('popupja')).off();
            $(getid("popup")).hide();
          });
        });
  
        $(getid("rapporterad_arbetstid_knapp_fake")).on("click", function() {
          var button = $(this);
          $(button).prop("disabled", true);
          $(getid("popuprubrik")).text("Stämmer uppgifterna?");
          $(getid("popup")).show();
          $(getid("popupja")).one("click", function() {
            $(button).prop("disabled", false);
              var TableData = [];
              $("#rapporterad_arbetstid>div>form").each(function(row, tr) {
                var form = $(tr);
                TableData[row] = {
                  'Num': form.find('.input_num').val(),
                  'Id': form.find('.input_id').val(),
                  'Dag': form.find('.input_dag').val(),
                  'Bil': form.find('.input_bil').val(),
                  'SchemalagdTid': form.find('.input_tid').val(),
                  'ArbetadeTimmar': form.find('.input_text').val().replace(',', '.')
                };
              });
  
              TableData = JSON.stringify(TableData);
  
              simpleAjax("./platform/ajax.php", {
                action: "godkannArbetstid",
                json: TableData
              }, null, "Just nu håller jag på att jobba! (kod #020)", function(data) {
                if (data.status === 1) {
                  refresh_tab('btn_hem');
                } else felMeddelande(data.msg);
              });
            $(getid("popup")).hide();
          });
          $(getid("popupnej")).one("click", function() {
            $(button).prop("disabled", false);
            $(getid('popupja')).off();
            $(getid("popup")).hide();
          });
        });
  
        $(getid("rensadata_knapp_fake")).on("click", function() {
          var button = $(this);
          $(button).prop("disabled", true);
          $(getid("popuprubrik")).text("Är du säker på att du vill rensa datan?");
          $(getid("popup")).show();
          $(getid("popupja")).one("click", function() {
            $(button).prop("disabled", false);
            $(getid("rensadata_knapp")).click();
            $(getid("popup")).hide();
          });
          $(getid("popupnej")).one("click", function() {
            $(button).prop("disabled", false);
            $(getid('popupja')).off();
            $(getid("popup")).hide();
          });
        });
      }, 10);
  
      $(b).on("click", ".rapportera_arbetstid_knapp", function() {
        var button = $(this),
          form = button.parent('form');
        $(button).prop("disabled", true);
        $(getid("popuprubrik")).text("Stämmer uppgifterna?");
        $(getid("popup")).show();
        $(getid("popupja")).one("click", function() {
          $(button).prop("disabled", false);
          $(form).submit();
          $(getid("popup")).hide();
        });
        $(getid("popupnej")).one("click", function() {
          $(button).prop("disabled", false);
          $(getid('popupja')).off();
          $(getid("popup")).hide();
        });
      });
  
      if (isMobile.matches) {
        $('.hamburger').trigger('click');
      }
  
      var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
      if (iOS) {
        b.addClass("ios");
        if(!window.location.pathname.includes('admin')){
          var qs = getQueryStrings();
          if ("id" in qs) {
  
            var btn_stuff = "";
            if (qs.id == "btn_mittschema")
              btn_stuff = "btn_bilar";
            else btn_stuff = "btn_mittschema";
  
            setTimeout(() => {
              var btn_id = btn_stuff,
                btn = $(getid(btn_id));
              change_tab(btn_id, btn.data("id"), btn.text(), false);
            }, 150);
            setTimeout(() => {
              var btn_id1 = qs.id,
                btn1 = $(getid(btn_id1));
              change_tab(btn_id1, btn1.data("id"), btn1.text());
            }, 200);
          }
        }
      }
      setTimeout(() => {
        $(getid("loader")).fadeOut(500);
      }, 1000);
  
      setTimeout(() => {
        b.removeClass("loader");
      }, 1500);
  
    }
    loadallstuff();
  });
  
  function toggle_visibility(id) {
    if (getid(id).style.display === "none") {
      $(getid(id)).addClass("fadein");
      getid(id).removeAttribute("style");
    } else {
      $(getid(id)).fadeOut(500);
      $(getid(id)).removeClass("fadein");
    }
  }
  
  function toggle_visibility_massmail(id) {
    toggle_visibility(id);
    if (getid("btn_massmail").classList.contains("selected")) {
      $(getid("btn_massmail")).removeClass("selected");
      var qs = getQueryStrings();
      if ("id" in qs) {
        $(getid(qs.id)).toggleClass("selected");
      }
    } else {
      $("#navbar>a.selected").removeClass("selected");
      $(getid("btn_massmail")).toggleClass("selected");
    }
  }
  
  function toggle_visibility_schema(id){
    toggle_visibility(id);
    if(!getid('dialog_view_schema').classList.contains('fadein')){
      updateBilarSchema(getid('content_scheman') ? 'btn_scheman' : 'btn_bilar');
    }
  }
  
  function switch_tab(id) {
    if (getid(id).style.display === "none") {
      $(getid(id)).addClass("fadein");
      getid(id).removeAttribute("style");
      getid(id === "schema" ? "skapa_schema" : "schema").style.display = "none";
      $(getid(id === "schema" ? "skapa_schema" : "schema")).removeClass("fadein");
      getid(id === "schema" ? "btn_skapa_schema" : "btn_schema").classList.remove("selected");
      getid(id === "schema" ? "btn_schema" : "btn_skapa_schema").classList.add("selected");
      if(id === 'schema')
        updateBilarSchema('btn_scheman');
    }
  }
  
  function switch_tab_1(id) {
    if (getid(id).style.display === "none") {
      var vyclass = '';
      if(getid(id).classList.contains('vy'))
        vyclass = '.vy';
      else vyclass = '.vy1';
      $(vyclass).css("display", "none");
      $(vyclass).removeClass("fadein");
      $(getid(id)).addClass("fadein");
      getid(id).removeAttribute("style");
    }
  }
  
  function toggle_visibility_1(id) {
    var btn = null,
      btn1 = null,
      btn2 = null,
      elem1 = null,
      elem2 = null;
    if (id === "veckovy" || id === "manadvy" || id === "arvy") {
      btn = getid(id === "veckovy" ? "veckobtn" : id === "manadvy" ? "manadbtn" : id === "arvy" ? "arbtn" : "");
      elem1 = getid(id === "veckovy" ? "manadvy" : id === "manadvy" ? "veckovy" : id === "arvy" ? "veckovy" : "");
      elem2 = getid(id === "veckovy" ? "arvy" : id === "manadvy" ? "arvy" : id === "arvy" ? "manadvy" : "");
      btn1 = getid(id === "veckovy" ? "manadbtn" : id === "manadvy" ? "veckobtn" : id === "arvy" ? "veckobtn" : "");
      btn2 = getid(id === "veckovy" ? "arbtn" : id === "manadvy" ? "arbtn" : id === "arvy" ? "manadbtn" : "");
    } else {
      return;
    }
  
    if (!btn.classList.contains("selected")) {
      elem1.style.display = "none";
      elem2.style.display = "none";
      getid(id).removeAttribute("style");
      btn.classList.add("selected");
      btn1.classList.remove("selected");
      btn2.classList.remove("selected");
    }
  }
  
  function change_tab(id1, id2, title, refresh=true) {
    var button = getid(id1),
      content = getid(id2);
  
    if (!button.classList.contains("selected")) {
      if ($(getid("navbar")).hasClass("menu")) {
        $("#navbar>ul>li>a.selected").removeClass("selected");
      } else {
        $("#navbar>a.selected").removeClass("selected");
      }
  
      document.title = title;
      button.classList.add("selected");
      var children = getid("main").children;
      for (var i = 0; i < children.length; i++) {
        children[i].style.display = "none";
        children[i].classList.remove("fadein");
      }
      $(content).addClass("fadein");
      if(refresh)
        refresh_tab(id1);
    }
  }
  
  function refresh_tab(id) {
    switch (id) {
      case "btn_hem": //admin hem
        setTimeout(() => {
          simpleAjax("./platform/ajax.php", {
            action: "getRapporteradArbetstid"
          }, null, "Just nu håller jag på att jobba! (kod #026)", function(data) {
            if (data.status === 1) {
                var content = '';
                data.content.forEach(element => {
                content += '<div><form class="rapporterad_arbetstid">'
                +'<input type="hidden" value="'+element.num+'" name="Num" class="input_num">'
                +'<table class="table table-hover table-mc-light-blue"><thead><tr><th>FN</th><th>Namn</th>'
                +'<th>Dag</th><th>Bil</th><th>Schemalagd tid</th><th>Arbetade timmar</th><th>Avvikelser</th>'
                +'</tr></thead><tbody><tr><td>'+element.driver_id+'</td><input type="hidden" value="'+element.driver_id+'" name="Id"class="input_id">'
                +'<td>'+element.namn+'</td>'
                +'<td>'+element.dag+'</td><input type="hidden" value="'+element.dag+'" name="Dag" class="input_dag">'
                +'<td>'+element.bilnummer+'</td><input type="hidden" value="'+element.bilnummer+'" name="Bil" class="input_bil">'
                +'<td>'+element.tid+'</td><input type="hidden" value="'+element.tid+'" name="SchemalagdTid" class="input_tid">'
                +'<td><input class="input_text" type="text" value="'+element.arbetade_timmar+'" name="ArbetadeTimmar"></td>'
                +'<td>'+element.avvikelser+'</td></tr></tbody></table>'
                +'<a href="#?id=btn_hem" class="button_klocka rapportera_arbetstid_knapp">Godkänn</a></form></div>';
                });
  
                $(getid('rapporterad_arbetstid')).empty().append(content);
                if(!isEmpty(content)){
                  $(getid("rapporterad_arbetstid_knapp_fake")).show();
                } else {
                  $(getid("rapporterad_arbetstid_knapp_fake")).hide();
                }
            } else if(data.status !== 2){
              felMeddelande(data.msg);
            }
          });
        }, 10);
        break;
      case "btn_forare": //admin förarlista
        setTimeout(() => {
          simpleAjax("./platform/ajax.php", {
            action: "getForare"
          }, null, "Just nu håller jag på att jobba! (kod #027)", function(data) {
            if (data.status === 1) {
                var content = '';
                data.content.forEach(element => {
                  content += '<tr data-adress="' + element.adress + '" data-anh="' + element.anh_tel_nr + '">'
                  + '<td data-title="Förarnummer">' + element.driver_id + '</td>'
                  + '<td data-title="Namn">' + element.namn + '</td>'
                  + '<td data-title="Efternamn">' + element.efternamn + '</td>'
                  + '<td data-title="Personnummer">' + element.personnummer + '</td>'
                  + '<td data-title="Mailadress">' + element.email + '</td>'
                  + '<td data-title="Telefonnummer">' + element.tel_nr + '</td>'
                  + '<td data-title="Aktiverad"><input type="checkbox"' + (element.aktiverad == 1 ? "checked " : "") + 'class="checkbox_forare"></td>'
                  + '<td data-title="Se schema"><a class="edit green seschema" href="#?id=btn_forare">Se schema</a></td>'
                  + '<td data-title="Redigera"><a class="edit green redigeraforare" href="#?id=btn_forare">Redigera</a></td></tr>';
                });
                $("#table_forare tbody").empty().append(content);
                sortRow('table_forare');
            } else if(data.status !== 2){
              felMeddelande(data.msg);
            }
          });
        }, 10);
        break;
      case "btn_bilar": //bilar
        if (getid("table_bilar")) {
          setTimeout(() => {
            simpleAjax("./platform/ajax.php", {
              action: "getBilar"
            }, null, "Just nu håller jag på att jobba! (kod #028)", function(data) {
              if (data.status === 1) {
                  var content = '';
                  data.content.forEach(element => {
                    content += '<tr><td data-title="Bil">' + element.bilnummer + '</td>'
                    + '<td data-title="Plats">' + element.plats + '</td>'
                    + '<td data-title="Nycklar Dagpass">' + element.nycklar_plats + '</td>'
                    + '<td data-title="Nycklar Nattpass">' + element.nycklar_plats_1 + '</td>'
                    + '<td data-title="Anteckning">' + element.anteckning + '</td>'
                    + '<td data-title="Redigera"><a class="edit green redigerabil" href="#?id=btn_bilar">Redigera</a></td></tr>';
                  });
                    $("#table_bilar tbody").empty().append(content);
                    sortRow('table_bilar');
              } else if(data.status !== 2){
                felMeddelande(data.msg);
              }
            });
          }, 10);
        }
  
        if(!getid('content_scheman'))
          updateBilarSchema('btn_bilar');
  
        break;
      case "btn_scheman":
        updateBilarSchema('btn_scheman');
        setTimeout(() => {
          setStandardtider("container_skapa_schema");
        }, 15);
        setTimeout(() => {
          getSchemaDropdowns('btn_scheman');
        }, 20);
        break;
      case "btn_aktivitet": //admin aktivitet
        setTimeout(() => {
          simpleAjax("./platform/ajax.php", {
            action: "getAktivitet"
          }, null, "Just nu håller jag på att jobba! (kod #031)", function(data) {
            if (data.status === 1) {
              if(!isEmpty(data.content)){
                var content = '';
                data.content.forEach(element => {
                  content += '<tr><td data-title="FN">'+element.driver_id+'</td>'
                  + '<td data-title="Namn">'+element.forarnamn+'</td>'
                  + '<td data-title="När">'+element.datum+'</td>'
                  + '<td data-title="Händelse">'+element.handelse+'</td></tr>';
                });
                $("#table_aktivitet tbody").empty().append(content);
                $(getid('dropdown_forare_6')).change();
              }
            }
          });
        }, 10);
        setTimeout(() => {
          simpleAjax("./platform/ajax.php", {
            action: "getStatistik"
          }, null, "Just nu håller jag på att jobba! (kod #050)", function(data) {
            if (data.status === 1) {
              if(!isEmpty(data.content)){
                var content = '';
                data.content.forEach(element => {
                  content += '<tr><td data-title="Månad">'+getManad(parseInt(element.manad, 10))+'</td>'
                  + '<td data-title="År">'+element.year+'</td>'
                  + '<td data-title="FN">'+element.driver_id+'</td>'
                  + '<td data-title="Namn">'+element.forarnamn+'</td>'
                  + '<td data-title="Typ" data-typ="'+element.typ+'">'+getTyp(parseInt(element.typ))+'</td>'
                  + '<td data-title="Antal">'+element.antal+'</td></tr>';
                });
                $("#table_statistik tbody").empty().append(content);
                $(getid('dropdown_statistik')).change();
              }
            }
          });
        }, 20);
        setTimeout(() => {
          getSchemaDropdowns('btn_aktivitet');
        }, 30);
        break;
      case "btn_overtid": //admin övertid
        setTimeout(() => {
          simpleAjax("./platform/ajax.php", {
            action: "getOvertidAdmin"
          }, null, "Just nu håller jag på att jobba! (kod #034)", function(data) {
            if (data.status === 1) {
              if(!isEmpty(data.content_vecka)){
                var content_vecka = '';
                data.content_vecka.forEach(element => {
                  content_vecka += '<tr><td data-title="Vecka">'+element.vecka+'</td>'
                    + '<td data-title="År">'+element.year+'</td>'
                    + '<td data-title="Förarnummer">'+element.driver_id+'</td>'
                    + '<td data-title="Namn">'+element.namn+'</td>'
                    + '<td data-title="Arbetstid">'+element.arbetstid+'</td>'
                    + '<td data-title="Övertid">'+element.overtid+'</td></tr>';
                });
                $("#table_overtid_vecka tbody").empty().append(content_vecka);
                sortRow('table_overtid_vecka');
              }
              if(!isEmpty(data.content_manad)){
              var content_manad = '';
              data.content_manad.forEach(element => {
                content_manad += '<tr class="content_row"><td data-title="Månad">'+element.manadnamn+'</td>'
                  + '<td data-title="År">'+element.year+'</td>'
                  + '<td data-title="Förarnummer">'+element.driver_id+'</td>'
                  + '<td data-title="Namn">'+element.namn+'</td>'
                  + '<td data-title="Arbetstid">'+element.arbetstid+'</td>'
                  + '<td data-title="Övertid">'+element.overtid+'</td></tr>';
              });
              $("#table_overtid_manad tbody").empty().append(content_manad);
              sortRow('table_overtid_manad');
              }
              if(!isEmpty(data.content_ar)){
              var content_ar = '';
              data.content_ar.forEach(element => {
                content_ar += '<tr><td data-title="År">'+element.year+'</td>'
                  + '<td data-title="Förarnummer">'+element.driver_id+'</td>'
                  + '<td data-title="Namn">'+element.namn+'</td>'
                  + '<td data-title="Arbetstid">'+element.arbetstid+'</td>'
                  + '<td data-title="Övertid">'+element.overtid+'</td>';
                  if(element.dispens == true) {
                    content_ar += '<td data-title="Dispens"><input type="checkbox" name="dispens" class="checkbox_dispens" checked></td></tr>';
                  } else {
                    content_ar += '<td data-title="Dispens"><input type="checkbox" name="dispens" class="checkbox_dispens"></td></tr>';
                  }
              });
              $("#table_overtid_ar tbody").empty().append(content_ar);
              sortRow('table_overtid_ar');
              }
            }
          });
        }, 10);
        setTimeout(() => {
          simpleAjax("./platform/ajax.php", {
            action: "getOvertidAvvikelser"
          }, null, "Just nu håller jag på att jobba! (kod #035)", function(data) {
            if (data.status === 1) {
              if(!isEmpty(data.content)){
                var content = '';
                data.content.forEach(element => {
                  content += '<tr data-id="'+element.num+'">'
                          + '<td data-title="FN">'+element.driver_id+'</td>'
                          + '<td data-title="Namn">'+element.namn+'</td>'
                          + '<td data-title="Dag">'+element.dag+'</td>'
                          + '<td data-title="Bil">'+element.bilnummer+'</td>'
                          + '<td data-title="Schemalagd tid">'+element.tid+'</td>'
                          + '<td data-title="Arbetade timmar">'+element.arbetade_timmar+'</td>'
                          + '<td data-title="Varav övertid">'+element.overtid+'</td>'
                          + '<td data-title="Avvikelser">'+element.avvikelser+'</td></tr>';
                });
                $("#table_avvikelser tbody").empty().append(content);
                sortRow('table_avvikelser');
              }
            }
          });
        }, 15);
        setTimeout(() => {
          getSchemaDropdowns('btn_overtid');
        }, 20);
        break;
      case "btn_installningar": //inställningar
        if (getid("container_spara_standardtider")) {
          setTimeout(() => {
            setStandardtider("container_spara_standardtider");
          }, 10);
        }
        if (getid("installningar_adress") && getid("installningar_email") && getid("installningar_telenr") && getid("installningar_anhorig_telenr")) {
          setTimeout(() => {
            simpleAjax("./platform/ajax.php", {
              action: "getForarInfo"
            }, null, "Just nu håller jag på att jobba! (kod #037)", function(data) {
              if (data.status === 1) {
                if(!isEmpty(data.adress))
                  $(getid("installningar_adress")).text(data.adress);
                if(!isEmpty(data.email))
                  $(getid("installningar_email")).text(data.email);
                if(!isEmpty(data.tel_nr))
                  $(getid("installningar_telenr")).text(data.tel_nr);
                if(!isEmpty(data.anh_tel_nr))
                  $(getid("installningar_anhorig_telenr")).text(data.anh_tel_nr);
              } else felMeddelande(data.msg);
            });
          }, 10);
        }
        break;
      case "btn_mittschema": //schema förare
        setTimeout(() => {
          simpleAjax("./platform/ajax.php", {
            action: "getSchema"
          }, null, "Just nu håller jag på att jobba! (kod #038)", function(data) {
            if (data.status === 1) {
              if(!isEmpty(data.content)){
                var content = '';
                data.content.forEach(element => {
                  content += '<tr data-id="'+element.manad+'" class="content_row">'
                  + '<td data-title="Vecka">'+element.vecka+'</td>'
                  + '<td data-title="Dag">'+element.dag+'</td>'
                  + '<td data-title="Ramtid">'+element.tid+'</td>'
                  + '<td data-title="Bil">'+element.bilnummer+'</td>'
                  + '<td data-title="Plats">'+element.plats+'</td>'
                  + '<td data-title="Nycklarna finns">'+element.nycklar+'</td></tr>';
                });
                $("#table_schema tbody").empty().append(content);
                sortRow('table_schema');
              }
  
            }
          });
        }, 10);
        break;
      case "btn_rapportera_arbetstider": //rapportera arbetstid förare
        setTimeout(() => {
          simpleAjax("./platform/ajax.php", {
            action: "getRapporteraArbetstid"
          }, null, "Just nu håller jag på att jobba! (kod #039)", function(data) {
            if (data.status === 1) {
              if (isEmpty(data.content)) {
                if($("#table_rapportera_arbetstider tbody").find('tr').length == 0)
                  $(getid("rapportera_arbetstider_knapp_fake")).hide();
              } else {
                $(getid("rapportera_arbetstider_knapp_fake")).show();
                var content = '';
                data.content.forEach(element => {
                  content += '<tr><td data-title="Dag">'+element.dag+'</td>'
                    + '<td data-title="Bil">'+element.bilnummer+'</td>'
                    + '<td data-title="Schemalagd tid">'+element.tid+'</td>'
                    + '<td data-title="Arbetade timmar"><input class="input_text" type="text"></td>'
                    + '<td data-title="Avvikelser"><input class="input_text" type="text" maxlength="100" size="5"></td></tr>';
                });
                $("#table_rapportera_arbetstider tbody").empty().append(content);
              }
            }
          });
        }, 10);
        break;
      case "btn_arbetstid": //arbetstid/övertid förare
        setTimeout(() => {
          simpleAjax("./platform/ajax.php", {
            action: "getArbetstidForare"
          }, null, "Just nu håller jag på att jobba! (kod #040)", function(data) {
            if (data.status === 1) {
              if(!isEmpty(data.content_vecka)){
                var content_vecka = '';
                data.content_vecka.forEach(element => {
                  content_vecka += '<tr class="content_row"><td data-title="Vecka">'+element.vecka+'</td>'
                    + '<td data-title="År">'+element.year+'</td>'
                    + '<td data-title="Övertid">'+element.overtid+'</td>'
                    + '<td data-title="Arbetstid">'+element.arbetstid+'</td></tr>';
                });
                $("#table_arbetstid_vecka tbody").empty().append(content_vecka);
              }
              if(!isEmpty(data.content_manad)){
                var content_manad = '';
                data.content_manad.forEach(element => {
                  content_manad += '<tr class="content_row"><td data-title="Månad">'+element.manadnamn+'</td>'
                      + '<td data-title="År">'+element.year+'</td>'
                      + '<td data-title="Övertid">'+element.overtid+'</td>'
                      + '<td data-title="Arbetstid">'+element.arbetstid+'</td></tr>';
                });
                $("#table_arbetstid_manad tbody").empty().append(content_manad);
              }
              if(!isEmpty(data.content_ar)){
                var content_ar = '';
                data.content_ar.forEach(element => {
                  content_ar += '<tr><td data-title="År">'+element.year+'</td>'
                  + '<td data-title="Övertid">'+element.overtid+'</td>'
                  + '<td data-title="Arbetstid">'+element.arbetstid+'</td></tr>';
                });
                $("#table_arbetstid_ar tbody").empty().append(content_ar);
              }
            }
          });
        }, 10);
        break;
      default:
        break;
    }
  }
  
  function getid(id) {
    return document.getElementById(id);
  }
  
  function getQueryStrings() {
    var assoc = {},
      decode = function(s) {
        return decodeURIComponent(s.replace(/\+/g, " "));
      },
      queryString = location.hash.substring(2),
      keyValues = queryString.split("&");
  
    for (var i in keyValues) {
      if (keyValues.hasOwnProperty(i)) {
        var key = keyValues[i].split("=");
        if (key.length > 1) {
          assoc[decode(key[0])] = decode(key[1]);
        }
      }
    }
  
    return assoc;
  }
  
  function filterViewSchema() {
    var things = $(getid('filterviewschemamanad')).val(),
      stuff = things.split('/')[0],
      text = things.split('/')[1],
      veckor = [],
      table = $(getid('table_view_schema'));
  
    table.find(".content_row").filter(function() {
      return $(this).data("id") == stuff;
    }).each(function() {
      var v = $(this).find("td:eq(0)").data("vecka");
      if (v != "" && v != undefined)
        if (!veckor.includes(v))
          veckor.push(v);
    });
  
    setTimeout(() => {
      $(getid('filterviewschema')).find("option").each(function() {
        if (!veckor.includes(parseInt($(this).val(), 10))) {
          $(this).hide();
        } else $(this).show();
      });
      $(getid('filterviewschema')).val(veckor[0]);
    }, 1);
  
    setTimeout(() => {
      $(getid("dialog_view_schema")).find(".header_list").find("li").first().text(getManad(parseInt(stuff)) + " " + text);
      if ($(".header_list_1").length)
        $(getid("dialog_view_schema")).find(".header_list_1").find("li").first().text(getManad(parseInt(stuff)) + " " + text);
      table.find(".content_row").each(function() {
        if ($(this).data("id") == stuff) {
          $(this).show();
        } else $(this).hide();
      });
    }, 2);
  }
  
  function scrollHack() {
    $(getid('filterviewschemamanad')).one('change', function() {
      setTimeout(() => {
        $('#dialog_view_schema>div.table_obj').animate({
          scrollTop: 1
        });
      }, 1);
      setTimeout(() => {
        $('#dialog_view_schema>div.table_obj').animate({
          scrollTop: -1
        });
      }, 2);
    });
  }
  
  function filterViewSchemaVecka(selector) {
    var stuff1 = $("#filterviewschema").val(),
      table = $("#table_view_schema"),
      temp = table.find(".content_row").filter(function() {
        return $(this).find("td:eq(0)").text() == stuff1;
      }).first().next("tr").position(),
      $contentHeight = $(".content_row").outerHeight(true),
      forareOffset = !selector.includes('table_obj') ? $contentHeight : 0
      isMobile = window.matchMedia("all and (max-width: 1024px)");
      if(isMobile.matches)
        forareOffset += $contentHeight/4;
    if (!isEmpty(temp))
      $(selector).animate({
        scrollTop: temp.top + $contentHeight - forareOffset
      }, 500);
  }
  
  function validTime(date, time) {
    var stuff = date.split("."),
      date1 = stuff[2] + "-" + stuff[1] + "-" + stuff[0],
      datum = new Date(),
      stuff1 = time.split("."),
      time1 = date1 + " " + stuff1[0] + ":" + stuff1[1] + ":00",
      arr = time1.split(/[- :]/),
      datum1 = new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5]);
    datum1.setHours(datum1.getHours() - 1);
    return datum.getTime() < datum1.getTime();
  }
  
  function getManad(num) {
    switch (num) {
      case 1:
        return "Januari";
      case 2:
        return "Februari";
      case 3:
        return "Mars";
      case 4:
        return "April";
      case 5:
        return "Maj";
      case 6:
        return "Juni";
      case 7:
        return "Juli";
      case 8:
        return "Augusti";
      case 9:
        return "September";
      case 10:
        return "Oktober";
      case 11:
        return "November";
      case 12:
        return "December";
      default:
        return "Error";
    }
  }
  
  function getTyp(num){
    switch(num){
      case 1:
        return "Avbokade pass (ledig)";
      case 2:
        return "Avbokade pass (sjukskriven)";
      case 3:
        return "Avbokade pass (tjänsteledig)";
      case 4:
        return "Avbokade pass (övrigt)";
      case 5:
        return "Rapporterade pass";
      case 6:
        return "Veckor av inaktivitet";
      case 7:
        return "Inloggningar";
      default:
        return "Error";
    }
  }
  
  function validateEmail(email) {
    var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  }
  
  function getSchemaDropdowns(flik) {
    if (getid("dropdown_bilar") && getid("dropdown_forare") && getid("dropdown_forare_2") && getid("dropdown_forare_3") && getid("dropdown_forare_4")) {
      simpleAjax("./platform/ajax.php", {
        action: "getSchemaDropdowns",
        flik: flik
      }, null, "Just nu håller jag på att jobba! (kod #041)", function(data) {
        if (data.status === 1) {
          if(flik === 'btn_scheman'){
            var content = '<option value="-1" disabled hidden selected>Välj bil</option>';
            data.content_bilar.forEach(element => {
              content += '<option value="'+element+'">Taxi '+element+'</option>';
            });
            $(getid("dropdown_bilar")).empty().append(content);
            var content_forare = '<option value="-1" disabled hidden selected>Välj förare</option>',
            content_forare_2 = '<option value="none">Ingen förare</option>',
            content_forare_3 = '<option value="none">Välj förare</option>',
            content = '';
            data.content_forare.forEach(element => {
                content += '<option value="'+element.driver_id+'">'+element.namn+'</option>';
            });
            content_forare += content;
            content_forare_2 += content;
            content_forare_3 += content;
            $(getid("dropdown_forare")).empty().append(content_forare_3);
            $(getid("dropdown_forare_2")).empty().append(content_forare_3);
            $(getid("dropdown_forare_4")).empty().append(content_forare);
            $(getid("dropdown_forare_3")).empty().append(content_forare_2);
          }
          if(flik === 'btn_overtid'){
            var content_forare_1 = '<option value="alla">Alla</option>';
            data.content_forare.forEach(element => {
              content_forare_1 += '<option value="'+element.driver_id+'">'+element.namn+'</option>';
            });
            $(getid("dropdown_forare_5")).empty().append(content_forare_1);
            $(getid("dropdown_forare_8")).empty().append(content_forare_1);
            $(".dropdown_forare_8").empty().append(content_forare_1);
            var content = '<option value="-1" disabled hidden selected>Välj månad</option>';
            data.content_manader.forEach(element => {
              content += '<option value="'+element.val+'">'+element.text+'</option>';
            });
            $(getid("dropdown_manad")).empty().append(content);
          }
          if(flik === 'btn_aktivitet'){
            var content_forare_1 = '<option value="alla">Alla</option>';
            data.content_forare.forEach(element => {
              content_forare_1 += '<option value="'+element.driver_id+'">'+element.namn+'</option>';
            });
            $(getid("dropdown_forare_6")).empty().append(content_forare_1);
            $(getid("dropdown_forare_7")).empty().append(content_forare_1);
            var content = '<option value="-1" disabled hidden selected>Välj månad</option>';
            data.content_manader.forEach(element => {
              content += '<option value="'+element.val+'">'+element.text+'</option>';
            });
            $(getid("dropdown_manad_1")).empty().append(content);
          }
        }
      });
    }
  }
  
  function klickaPassForare(elem, elemname, typ) {
    var td = $(elem),
      text = $(td).text(),
      dag = $(elem).parent("tr").find("td:eq(1)").data("id"),
      tid = $(td).data("tid"),
      id = $(td).parent("tr").data("bil");
    if (text.startsWith("Boka")) {
      $(getid("popuprubrik")).text("Boka tid");
      $(getid("popupmessage")).text("Bekräfta bokningen av tiden " + tid + " för Taxi " + id + " dagen " + dag + "?");
      $(getid("popup")).show();
      $(getid('popupja')).one("click", function() {
        var knapp = $(this);
        $(knapp).prop("disabled", true);
        simpleAjax("./platform/ajax.php", {
          action: "bokaLedigTid",
          id: id,
          tid: tid,
          dag: dag,
          typ: typ
        }, knapp, "Just nu håller jag på att jobba! (kod #042)", function(data) {
          if (data.status === 1) {
            $(td).text(data.namn);
            $(td).data("id", data.id);
            $(td).css("color", "var(--Red)");
          }
          meddelande("Boka tid", data.msg);
        });
        $(getid("popup")).hide();
      });
      $("#popup>div>a.red").one("click", function() {
        $(getid("popup")).hide();
      });
    } else {
      simpleAjax("./platform/ajax.php", {
        action: "checkId",
        id: $(td).data("id")
      }, null, "Just nu håller jag på att jobba! (kod #043)", function(data) {
        if (data.status === 1) {
          if (!$(td).data("locked")) {
            if (validTime(dag.split(" ")[1], tid.split(" - ")[0])) {
              $(getid("dialog_box_1")).data("tid", tid).data("dag", dag).data("typ", typ).data("forar_id", $(td).data("id")).data("bil", id).data("td", elemname);
              $(getid("dialog_box_1")).find("h2.title").text(dag);
              $(getid("dialog_box_1")).find("h2.subtitle").text("(" + tid + ")");
              toggle_visibility("dialog_box_1");
            } else {
              felMeddelande("Det är för sent för att avboka det här passet.");
            }
          } else {
            felMeddelande("Du kan inte avboka ett pass du redan har rapporterat in!");
          }
        }
      });
    }
  }
  
  function klickaPassAdmin(elem, elemname, typ) {
    var td = $(elem);
    if (!$(td).data("locked")) {
      var text = $(td).text(),
        dag = $(elem).parent("tr").find("td:eq(1)").data("id"),
        tid = $(td).data("tid");
      if (!text.startsWith("Boka")) {
        $(getid("dialog_box_1")).data("tid", tid).data("dag", dag).data("typ", typ).data("forar_id", $(td).data("id")).data("bil", $(td).parent("tr").data("bil")).data("td", elemname);
        $(getid("dialog_box_1")).find("h2.title").text(dag);
        $(getid("dialog_box_1")).find("h2.subtitle").text("(" + tid + ")");
        $(getid("dialog_box_1")).find("h3").text(text.replace(" " + tid, ""));
        toggle_visibility("dialog_box_1");
      } else {
        $(getid("dialog_box")).data("tid", tid).data("dag", dag).data("typ", typ).data("bil", $(td).parent("tr").data("bil")).data("td", elemname);
        $(getid("dialog_box")).find("h2.title").text(dag);
        $(getid("dialog_box")).find("h2.subtitle").text("(" + tid + ")");
        toggle_visibility("dialog_box");
      }
    } else {
      meddelande("", "Det här passet har redan rapporterats!");
    }
  }
  
  function isEmpty(mixed_var) {
    var key;
    if (mixed_var === "" || mixed_var === 0 || mixed_var === "0" || mixed_var === null || mixed_var === false || mixed_var === undefined) {
      return true;
    }
    if (typeof mixed_var == 'object') {
      for (key in mixed_var) {
        if (mixed_var.hasOwnProperty(key)) {
          return false;
        }
      }
      return true;
    }
    return false;
  }
  
  function meddelande(titel, text) {
  
    var checktitle = !isEmpty(titel);
    $(getid("popuprubrik_2")).text(checktitle ? titel : "Meddelandde");
    $(getid("popupmessage_2")).text(text);
    $(getid("popup_2")).show();
  }
  
  function felMeddelande(text, laddaom = false) {
    meddelande("", text);
    if (laddaom) {
      $(getid('popupokej')).one('click', function() {
        window.location.reload(false);
      });
    }
  }
  
  function handleLogin(url, formData, target, errormsg, sendbutton) {
    simpleAjax(url, formData, sendbutton, errormsg, function(data){
      if (data.status === 1)
        $(location).attr("href", data.url + target);
      else alert(data.msg);
    });
  }
  
  function simpleAjax(url, formData, sendbutton, errormsg, handlerFunc = null) {
    var b = document.getElementsByTagName('body')[0];
    if (b.classList.contains('ajax')) {
      setTimeout(() => {
        simpleAjax(url, formData, sendbutton, errormsg, handlerFunc);
      }, 200);
    } else {
      b.classList.add('ajax');
      var process = !(formData instanceof FormData);
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: "JSON",
        processData: process,
        contentType: process ? 'application/x-www-form-urlencoded; charset=UTF-8' : process,
        cache: false,
        success: function(data) {
          if (sendbutton != null)
            $(sendbutton).prop("disabled", false);
          if (handlerFunc != null)
            handlerFunc(data);
          b.classList.remove('ajax');
        },
        error: function() {
          if (sendbutton != null)
            $(sendbutton).prop("disabled", false);
          if (getid("popup_2"))
            felMeddelande(errormsg, true);
          else alert(errormsg);
          b.classList.remove('ajax');
        }
      });
    }
  }
  
  function processSchemabyte(tddata, forar_id, dag_ = null) {
    $("#table_view_schema>tbody>tr").find(tddata).each(function() {
      var td = $(this);
      if ($(td).data("id") === forar_id && $(td).data("locked") === 0) {
        var dag = $(this).parent("tr").find("td:eq(1)").data("id"),
          tid = $(td).data("tid");
        if (dag_ == null || dag === dag_) {
          var bytforare = $("#dropdown_forare_3 option:selected").val();
          if (bytforare === 'none') {
            $(td).text("Boka   " + tid);
            $(td).data("id", 0);
            $(td).css("color", "var(--Green)");
          } else {
            $(td).text($("#dropdown_forare_3 option:selected").text() + "   " + tid);
            $(td).data("id", bytforare);
          }
        }
      }
    });
  }
  
  function filterForare(filter, tablename, row){
    var id = $(filter).find("option:selected").val(),
          table = $('#'+tablename+' tbody');
        if (id == 'alla') {
          table.find("tr").show();
        } else {
          table.find("tr").each(function() {
            if ($(this).find("td:eq("+row+")").text() == id ||
              $(this).find("td:eq("+row+")").data('typ') == id) {
              $(this).show();
            } else $(this).hide();
          });
        }
  }
  
  function updateBilarSchema(knapp){
    if (getid("list_bilar")) {
      setTimeout(() => {
        simpleAjax("./platform/ajax.php", {
          action: "getBilarSchema"
        }, null, "Just nu håller jag på att jobba! (kod #030)", function(data) {
          if (data.status === 1) {
              getid("list_bilar").innerHTML='';
              var content = '';
              data.content.forEach(element => {
                content += '<li class="taxi" data-id="'+element.bilnummer+'">'
                + '<a class="'+element.color+'"  href="#?id='+knapp+'">Taxi '+element.bilnummer+'</a></li>';
              });
              $(getid("list_bilar")).append(content);
              if($('body').data('dir') == "asc" && $(getid('sortera')).children(':selected').val() == 0)
                $(getid('sortera')).children(':selected').click();
              $(getid('sortera')).children(':selected').click();
              $("#list_bilar>li").on("click", function() {
                var id = $(this).data("id");
                simpleAjax("./platform/ajax.php", {
                  action: "getSchemaForBil",
                  id: id
                }, null, "Just nu håller jag på att jobba! (kod #029)", function(data) {
                  if (data.status === 1) {
                    setTimeout(function() {
                      var header = $(getid("dialog_view_schema")).find(".admin_info_header").last();
                      $(getid("dialog_view_schema")).find(".header_list").empty();
  
                      var header_data = data.header_info;
                      var header_info = '<li>'+header_data.top+'</li><li>Taxi '+header_data.bilnummer+' står:</li>'
                        +'<li>Nycklar dagpass:</li><li>Nycklar nattpass:</li><li></li>'
                        + '<li>'+header_data.plats+'</li><li>'+header_data.nycklar_plats+'</li>'
                        + '<li>'+header_data.nycklar_plats_1+'</li>';
  
                      if (data.header_info_1 === 'undefined') {
                        $(getid("dialog_view_schema")).find(".header_list").append(header_info);
                      } else {
                        $(getid("dialog_view_schema")).find(".header_list").append(header_info);
  
                        var header_info_1 = '<li>'+header_data.top+'</li>'
                          + '<li class="schema_taxibil">Taxi '+header_data.bilnummer+' står:</li>'
                          + '<li class="schema_taxiplats">'+header_data.plats+'</li>'
                          + '<li class="schema_dagpass">Nycklar dagpass:</li>'
                          + '<li class="schema_dagpassplats">'+header_data.nycklar_plats+'</li>'
                          + '<li class="schema_nattpass">Nycklar nattpass:</li>'
                          + '<li class="schema_nattpassplats">'+header_data.nycklar_plats_1+'</li>';
  
                        $(getid("dialog_view_schema")).find(".header_list_1").empty();
                        $(getid("dialog_view_schema")).find(".header_list_1").append(header_info_1);
                      }
                      header.empty();
                      if ($(getid("filterviewschema")).length == 0){
                        var filter_vecka = '<div class="filterdiv"><label for="filterviewschema">Vecka: </label><div class="select-container"><select id="filterviewschema" style="display:inline-block" onchange="filterViewSchemaVecka(\''+data.vecka_selector+'\');" class="input_style">';
                        data.filter_vecka.forEach(element => {
                          filter_vecka += '<option value="'+element+'">'+element+'</option>';
                        });
                        header.append(filter_vecka);
                      }
                      if ($(getid("filterviewschemamanad")).length == 0){
                        var filter_manad = '<div class="filterdiv"><label for="filterviewschema">Månad: </label><div class="select-container"><select id="filterviewschemamanad" style="display:inline-block" onchange="filterViewSchema();" class="input_style">';
                        data.filter_manad.forEach(element => {
                          filter_manad += '<option value="'+element.val+'">'+element.text+'</option>';
                        });
                        header.append(filter_manad);
                      }
  
                        var content = '';
                        data.content.forEach(element => {
                          if(element.isheader){
                            content += '<tr style="height:15px" data-id="'+element.manad+'" class="content_row hidemobile"></tr><tr data-id="'+element.manad+'" class="content_row hidemobile">'
                            + '<th data-title="Vecka" data-vecka="'+element.vecka+'">Vecka</th>'
                            + '<th data-title="Datum">Datum</th>'
                            + '<th data-title="Dagpass">Dagpass</th>'
                            + '<th data-title="Nattpass">Nattpass</th></tr>';
                          } else {
                            content += '<tr data-id="'+element.manad+'" data-bil="'+element.bilnummer+'" class="content_row">'
                            + '<td data-title="Vecka" data-vecka="'+element.vecka+'">'+element.vecka+'</td>'
                            + '<td data-title="Datum" data-id="'+element.dag1+'">' +element.dag+ '</td>'
                            + '<td data-title="Dagpass" data-tid="' + element.dagtid + '" data-id="' + element.dagforare + '" data-locked="' + element.lockeddag + '" class="clickable">'+ element.dagnamn +'   ' + element.dagtid + '</td>'
                            + '<td data-title="Nattpass" data-tid="' + element.natttid + '" data-id="' + element.nattforare + '" data-locked="' + element.lockednatt + '" class="clickable">'+ element.nattnamn +'   ' + element.natttid + '</td></tr>';
                          }
                        });
                      $(getid("table_view_schema")).find("tbody").empty().append(content);
                      filterViewSchema();
                      scrollHack();
                      if (data.sida === "forare") {
                        $("#table_view_schema>tbody>tr").find("td:eq(2)").on("click", function() {
                          klickaPassForare(this, "td:eq(2)", "dag");
                        });
                        $("#table_view_schema>tbody>tr").find("td:eq(3)").on("click", function() {
                          klickaPassForare(this, "td:eq(3)", "natt");
                        });
                      }
                      if (data.sida === "admin") {
                        $("#table_view_schema>tbody>tr").find("td:eq(2)").on("click", function() {
                          klickaPassAdmin(this, "td:eq(2)", "dag");
                        });
                        $("#table_view_schema>tbody>tr").find("td:eq(3)").on("click", function() {
                          klickaPassAdmin(this, "td:eq(3)", "natt");
                        });
                      }
                      toggle_visibility('dialog_view_schema');
                    }, 10);
                  }
                });
              });
          } else if(data.status !== 2){
            felMeddelande(data.msg);
          }
        });
      }, 10);
    }
  }
  
  function sortTable(n, tablename, typ=0) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = $(getid(tablename)).find('tbody')[0];
    switching = true;
    dir = "desc";
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 0; i < (rows.length -1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        if (dir == "asc") {
          if(typ == 1){
            if ($(x).text().split(' ')[1] > $(y).text().split(' ')[1]) {
              shouldSwitch = true;
              $(getid(tablename)).find('thead th').children('i').remove();
              $(getid(tablename)).find('thead th:eq('+n+')').append('<i class="fas fa-sort-down"></i>');
              break;
            }
          } else if(typ == 2){
            if (parseInt($(x).text()) > parseInt($(y).text())) {
              shouldSwitch = true;
              $(getid(tablename)).find('thead th').children('i').remove();
              $(getid(tablename)).find('thead th:eq('+n+')').append('<i class="fas fa-sort-down"></i>');
              break;
            }
          } else {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              $(getid(tablename)).find('thead th').children('i').remove();
              $(getid(tablename)).find('thead th:eq('+n+')').append('<i class="fas fa-sort-down"></i>');
              break;
            }
          }
  
        } else if (dir == "desc") {
          if(typ == 1){
            if ($(x).text().split(' ')[1] < $(y).text().split(' ')[1]) {
              shouldSwitch = true;
              $(getid(tablename)).find('thead th').children('i').remove();
              $(getid(tablename)).find('thead th:eq('+n+')').append('<i class="fas fa-sort-up"></i>');
              break;
            }
          } else if(typ == 2){
            if (parseInt($(x).text()) < parseInt($(y).text())) {
              shouldSwitch = true;
              $(getid(tablename)).find('thead th').children('i').remove();
              $(getid(tablename)).find('thead th:eq('+n+')').append('<i class="fas fa-sort-up"></i>');
              break;
            }
          } else {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              shouldSwitch = true;
              $(getid(tablename)).find('thead th').children('i').remove();
              $(getid(tablename)).find('thead th:eq('+n+')').append('<i class="fas fa-sort-up"></i>');
              break;
            }
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount ++;
      } else {
        if (switchcount == 0 && dir == "desc") {
          dir = "asc";
          switching = true;
        }
      }
    }
  }
  
  function sortListDir(available=false) {
    var list, i, switching, b, shouldSwitch, dir, switchcount = 0;
    list = getid("list_bilar");
    switching = true;
    if($('body').data('dir'))
    dir = $('body').data('dir');
    else dir = "desc";
    while (switching) {
      switching = false;
      b = list.getElementsByTagName("LI");
      for (i = 0; i < (b.length - 1); i++) {
        shouldSwitch = false;
        if (dir == "asc") {
          if(available){
            if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
              shouldSwitch = true;
              break;
            }
          } else {
            if (parseInt($(b[i]).find('a').text().split(' ')[1]) > parseInt($(b[i + 1]).find('a').text().split(' ')[1])) {
              shouldSwitch = true;
              break;
            }
          }
        } else if (dir == "desc") {
          if(available){
            if (b[i].innerHTML.toLowerCase() < b[i + 1].innerHTML.toLowerCase()) {
              shouldSwitch= true;
              break;
            }
          } else {
            if (parseInt($(b[i]).find('a').text().split(' ')[1]) < parseInt($(b[i + 1]).find('a').text().split(' ')[1])) {
              shouldSwitch= true;
              break;
            }
          }
        }
      }
      if (shouldSwitch) {
        b[i].parentNode.insertBefore(b[i + 1], b[i]);
        switching = true;
        switchcount ++;
      } else {
        if (switchcount == 0)
          if(dir == "desc") {
          dir = "asc";
          $('body').data('dir', dir);
          switching = true;
        } else if(dir == "asc"){
          dir = "desc";
          $('body').data('dir', dir);
          switching = true;
        }
      }
    }
  }
  
  function setStandardtider(id){
    simpleAjax("./platform/ajax.php", {
      action: "getStandardtider"
    }, null, "Just nu håller jag på att jobba! (kod #033)", function(data) {
      getid(id).innerHTML='';
      if (data.status === 1) {
        var content = '<div style="display: inline-block; width: 30%"><p>Dag</p><p class="aligned_text">Måndag</p>'
          +'<p class="aligned_text">Tisdag</p><p class="aligned_text">Onsdag</p><p class="aligned_text">Torsdag</p><p class="aligned_text">Fredag</p>'
          +'<p class="aligned_text">Lördag</p><p class="aligned_text">Söndag</p></div>';
        if(!isEmpty(data.content)){
          var element = data.content;
            content += '<div style="display: inline-block; width: 30%"><p>Dagpass</p>'
            + '<div><input type="text" name="dag1[]" value="'+element.dag1[0]+'" />-<input type="text" name="dag1[]" value="'+element.dag1[1]+'" /></div>'
            + '<div><input type="text" name="dag2[]" value="'+element.dag2[0]+'" />-<input type="text" name="dag2[]" value="'+element.dag2[1]+'" /></div>'
            + '<div><input type="text" name="dag3[]" value="'+element.dag3[0]+'" />-<input type="text" name="dag3[]" value="'+element.dag3[1]+'" /></div>'
            + '<div><input type="text" name="dag4[]" value="'+element.dag4[0]+'" />-<input type="text" name="dag4[]" value="'+element.dag4[1]+'" /></div>'
            + '<div><input type="text" name="dag5[]" value="'+element.dag5[0]+'" />-<input type="text" name="dag5[]" value="'+element.dag5[1]+'" /></div>'
            + '<div><input type="text" name="dag6[]" value="'+element.dag6[0]+'" />-<input type="text" name="dag6[]" value="'+element.dag6[1]+'" /></div>'
            + '<div><input type="text" name="dag7[]" value="'+element.dag7[0]+'" />-<input type="text" name="dag7[]" value="'+element.dag7[1]+'" /></div>'
            + '</div><div style="display: inline-block; width: 30%"><p>Nattpass</p>'
            + '<div><input type="text" name="natt1[]" value="'+element.natt1[0]+'" />-<input type="text" name="natt1[]" value="'+element.natt1[1]+'" /></div>'
            + '<div><input type="text" name="natt2[]" value="'+element.natt2[0]+'" />-<input type="text" name="natt2[]" value="'+element.natt2[1]+'" /></div>'
            + '<div><input type="text" name="natt3[]" value="'+element.natt3[0]+'" />-<input type="text" name="natt3[]" value="'+element.natt3[1]+'" /></div>'
            + '<div><input type="text" name="natt4[]" value="'+element.natt4[0]+'" />-<input type="text" name="natt4[]" value="'+element.natt4[1]+'" /></div>'
            + '<div><input type="text" name="natt5[]" value="'+element.natt5[0]+'" />-<input type="text" name="natt5[]" value="'+element.natt5[1]+'" /></div>'
            + '<div><input type="text" name="natt6[]" value="'+element.natt6[0]+'" />-<input type="text" name="natt6[]" value="'+element.natt6[1]+'" /></div>'
            + '<div><input type="text" name="natt7[]" value="'+element.natt7[0]+'" />-<input type="text" name="natt7[]" value="'+element.natt7[1]+'" /></div></div>';
        } else {
          content += '<div style="display: inline-block; width: 30%"><p>Dagpass</p>'
          + '<div><input type="text" name="dag1[]" value="05.00" />-<input type="text" name="dag1[]" value="14.00" /></div>'
          + '<div><input type="text" name="dag2[]" value="05.00" />-<input type="text" name="dag2[]" value="14.00" /></div>'
          + '<div><input type="text" name="dag3[]" value="05.00" />-<input type="text" name="dag3[]" value="14.00" /></div>'
          + '<div><input type="text" name="dag4[]" value="05.00" />-<input type="text" name="dag4[]" value="14.00" /></div>'
          + '<div><input type="text" name="dag5[]" value="05.00" />-<input type="text" name="dag5[]" value="14.00" /></div>'
          + '<div><input type="text" name="dag6[]" value="05.00" />-<input type="text" name="dag6[]" value="14.00" /></div>'
          + '<div><input type="text" name="dag7[]" value="05.00" />-<input type="text" name="dag7[]" value="14.00" /></div>'
          + '</div><div style="display: inline-block; width: 30%"><p>Nattpass</p>'
          + '<div><input type="text" name="natt1[]" value="16.00" />-<input type="text" name="natt1[]" value="01.00" /></div>'
          + '<div><input type="text" name="natt2[]" value="16.00" />-<input type="text" name="natt2[]" value="01.00" /></div>'
          + '<div><input type="text" name="natt3[]" value="16.00" />-<input type="text" name="natt3[]" value="01.00" /></div>'
          + '<div><input type="text" name="natt4[]" value="16.00" />-<input type="text" name="natt4[]" value="01.00" /></div>'
          + '<div><input type="text" name="natt5[]" value="16.00" />-<input type="text" name="natt5[]" value="01.00" /></div>'
          + '<div><input type="text" name="natt6[]" value="16.00" />-<input type="text" name="natt6[]" value="01.00" /></div>'
          + '<div><input type="text" name="natt7[]" value="16.00" />-<input type="text" name="natt7[]" value="01.00" /></div></div>';
        }
        $(getid(id)).append(content);
      }
    });
  }
  
  function processQS(){
    var qs = getQueryStrings();
      if ("id" in qs) {
        var btn_id = qs.id,
          btn = $(getid(btn_id));
        change_tab(btn_id, btn.data("id"), btn.text());
      }
  }
  
  function sortRow(table){
    if($(getid(table)).find('i').length){
      var tdi = $(getid(table)).find('i');
      $(tdi).parent('th').click();
      if(tdi.hasClass('fa-sort-down')){
        $(tdi).parent('th').click();
      }
    }
  }