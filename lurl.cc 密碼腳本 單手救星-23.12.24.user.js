// ==UserScript==
// @license MIT
// @name         單手救星
// @namespace    https://greasyfork.org/zh-TW/scripts/482985-%E5%96%AE%E6%89%8B%E6%95%91%E6%98%9F
// @version      23.12.24
// @description  Release your busily hand for peace !!
// @author       Fourteen
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @match        https://lurl.cc/*
// @match        https://myppt.cc/*
// @grant        none

// ==/UserScript==

/*
原始功能 : 預設密碼 - 自動填入上傳日期作為預設密碼並自動提交
改自     單手救星 https://greasyfork.org/zh-TW/scripts/482985-%E5%96%AE%E6%89%8B%E6%98%9F
本人增加自動點擊 ("送出", "立即解密") 密碼錯誤時不執行腳本
*/

// ====== Variable

var Domain;

// ====== Window

window.onload = function() {
    const Url = window.location.href;
    console.log("頁面讀取完畢，開始進行過濾 !!");

    // 檢查是否有 "❌ 密碼錯誤" 提示
    if ($("span.text:contains('❌ 密碼錯誤')").length > 0) {
        console.log("檢測到密碼錯誤，停止腳本執行");
        return;
    }

    Domain = Array.from(Url.matchAll(/\:\/\/(.*)\/\*?/g), md => md[1])[0];
    Domain_Action(Domain);
}

// ====== Function

function Domain_Action(DA_Domain) {
    let Update_Time = null, Password = null;
    switch (DA_Domain) {
        case "lurl.cc":
            if ($("input#password").length) {
                Update_Time = $("#form_password span.login_span").text();
                Password = (Array.from(Update_Time.matchAll(/\d{4}-(\d{2}\-\d{2})/g), m => m[1])[0]).replace("-", "");
                $("input#password").val(Password);
                $("#form_password span.login_span").parent().append(`<br /><span style='font-size: 0.9rem; font-weight:bold; color:#BFBFBF;'>單手救星又解救了您忙碌的另一隻手，世界又美了 !!`).last();
                ClickButtonByText("送出", "立即解密");
            }
            break;
        case "myppt.cc":
            if ($("input#pasahaicsword").length) {
                Update_Time = $("#form_paskznblsword .login_span").text();
                Password = (Array.from(Update_Time.matchAll(/\d{4}-(\d2\-\d{2})/g), m => m[1])[0]).replace("-", "");
                $("input#pasahaicsword").val(Password);
                $("#form_paskznblsword span.login_span").parent().append(`<br /><span style='font-size: 0.9rem; font-weight:bold; color:#555555;'>單手救星又解救了您忙碌的另一隻手，世界又美了 !!`).last();
                ClickButtonByText("送出", "立即解密");
            }
            break;
    }
}

function ClickButtonByText(...buttonTexts) {
    buttonTexts.forEach(text => {
        let button = $(`button:contains(${text})`);
        if (button.length) {
            button.click();
        }
    });
}
