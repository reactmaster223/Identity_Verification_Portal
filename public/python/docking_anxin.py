# -*- coding: utf-8 -*-
# pip install selenium==2.48.0
import ddddocr
import sys
import io
from PIL import Image
from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import requests
import json
import datetime
import base64


def identify_captcha(pic):
    ocr = ddddocr.DdddOcr()
    with open(pic, "rb") as f:
        img_bytes = f.read()
    res = ocr.classification(img_bytes)
    return res


def save_capthca(left, top, right, bottom, captcha_pic="captcha.png"):
    im = Image.open(r"login_page.png")
    im = im.crop((left, top, right, bottom))
    im.save(captcha_pic)


def simulate_login(url, username, password):
    page_source = "验证码错误"
    is_login = False
    while is_login == False:
        # driver = webdriver.PhantomJS('./phantomjs-2.1.1-windows/bin/phantomjs.exe')
        # driver = webdriver.Chrome('./chromedriver.exe')
        # 创建一个参数对象，用来控制chrome以无界面模式打开
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--disable-gpu")
        # 创建浏览器对象
        driver = webdriver.Chrome(chrome_options=chrome_options)
        # driver = webdriver.Chrome()  # 不加 chrome_options 参数就是正常的打开一个浏览器，进行操作
        driver.implicitly_wait(10)
        # 访问登录页面
        driver.get(url)
        # print("验证码错误")
        driver.save_screenshot("login_page.png")
        # username
        username_element = driver.find_element_by_xpath(
            """//*[@id="app"]/div/div/div/div/form/div[1]/div/div/input"""
        )
        username_element.clear()
        username_element.send_keys(username)
        # password
        password_element = driver.find_element_by_xpath(
            """//*[@id="app"]/div/div/div/div/form/div[2]/div/div/input"""
        )
        password_element.clear()
        password_element.send_keys(password)
        captcha_element = driver.find_element_by_xpath(
            """//*[@id="app"]/div/div/div/div/form/div[3]/div/div/div[2]/img"""
        )
        left = captcha_element.location["x"]
        top = captcha_element.location["y"]
        right = captcha_element.location["x"] + captcha_element.size["width"]
        bottom = captcha_element.location["y"] + captcha_element.size["height"]
        save_capthca(left, top, right, bottom)
        pic = "captcha.png"
        captcha_code = identify_captcha(pic)
        captcha_element = driver.find_element_by_xpath(
            """//*[@id="app"]/div/div/div/div/form/div[3]/div/div/div[1]/div/input"""
        )
        captcha_element.send_keys(captcha_code)
        # 点击登录
        login = driver.find_element_by_xpath(
            """//*[@id="app"]/div/div/div/div/form/div[5]/div/button"""
        )
        login.click()
        time.sleep(3)
        page_source = driver.page_source
        if ("验证码错误" in page_source) or ("欢迎登录安信工作证管理平台" not in page_source):
            print("Wrong captcha")
            is_login = False
            cookies = "Fail Wait"
        else:
            print("Right captcha")
            is_login = True
            # print(page_source)
            cookies = driver.get_cookies()
            cookies_dict = {
                cookie["name"]: cookie["value"] for cookie in driver.get_cookies()
            }
        driver.quit()
    # print("success login_page")
    # print(cookies_dict)
    return cookies_dict


def add_anxin_permit(cookies, users_xlsx_filename, anxin_permit_result_filename):
    session = requests.Session()
    paramsPost = {"modelId": "214"}
    paramsMultipart = [
        (
            "file",
            (
                users_xlsx_filename,
                open(users_xlsx_filename, "rb"),
                "application/octet-stream",
            ),
        )
    ]
    headers = {
        "Origin": "https://workcardmgr.easyctid.cn",
        "Sec-Ch-Ua": '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
        "Accept": "*/*",
        "Sec-Ch-Ua-Platform": '"Windows"',
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36",
        "Referer": "https://workcardmgr.easyctid.cn/",
        "Connection": "close",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Dest": "empty",
        "Accept-Encoding": "gzip, deflate",
        "Sec-Fetch-Mode": "cors",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,ko;q=0.7",
        "Sec-Ch-Ua-Mobile": "?0",
    }
    response = session.post(
        "https://workcardmgr.easyctid.cn/ctid/card/manage/app/card/readExcel",
        data=paramsPost,
        files=paramsMultipart,
        headers=headers,
        cookies=cookies,
    )
    print("add_anxin_permit Status code:   %i" % response.status_code)
    print("download_anxin_permit_result Response body: %s" % response.content)
    fail_num = json.loads(response.content)["data"]["fail"]
    if fail_num == 0:
        downloadId = False
        download_anxin_permit_result(
            cookies, downloadId, anxin_permit_result_filename, is_empty=True
        )
    # print(downloadId)
    else:
        downloadId = json.loads(response.content)["data"]["downloadId"]
        download_anxin_permit_result(cookies, downloadId, anxin_permit_result_filename)


def download_anxin_permit_result(
    cookies, downloadId, anxin_permit_result_filename, is_empty=False
):
    if is_empty:
        empty_file = "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"
        with open(anxin_permit_result_filename, "wb") as f:
            f.write(base64.b64decode(empty_file))
    else:
        session = requests.Session()
        rawBody = '{"downloadId":"%s"}' % (downloadId)
        headers = {
            "Origin": "https://workcardmgr.easyctid.cn",
            "Sec-Ch-Ua": '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
            "Accept": "application/json, text/plain, */*",
            "Sec-Ch-Ua-Platform": '"Windows"',
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36",
            "Referer": "https://workcardmgr.easyctid.cn/",
            "Connection": "close",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-Dest": "empty",
            "Accept-Encoding": "gzip, deflate",
            "Sec-Fetch-Mode": "cors",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,ko;q=0.7",
            "Sec-Ch-Ua-Mobile": "?0",
            "Content-Type": "application/json",
        }
        response = session.post(
            "https://workcardmgr.easyctid.cn/ctid/card/manage/app/download/excel/fail",
            data=rawBody,
            headers=headers,
            cookies=cookies,
        )
        print("download_anxin_permit_result Status code:   %i" % response.status_code)
        with open(anxin_permit_result_filename, "wb") as f:
            f.write(response.content)


def download_health_status(cookies, health_status_filename):
    session = requests.Session()
    paramsPost = """{}"""
    headers = {
        "Origin": "https://workcardmgr.easyctid.cn",
        "Sec-Ch-Ua": '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
        "Accept": "application/json, text/plain, */*",
        "Sec-Ch-Ua-Platform": '"Windows"',
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36",
        "Referer": "https://workcardmgr.easyctid.cn/",
        "Connection": "close",
        "Sec-Fetch-Site": "same-origin",
        "Sec-Fetch-Dest": "empty",
        "Accept-Encoding": "gzip, deflate",
        "Sec-Fetch-Mode": "cors",
        "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,ko;q=0.7",
        "Sec-Ch-Ua-Mobile": "?0",
        "Content-Type": "application/json",
    }
    response = session.post(
        "https://workcardmgr.easyctid.cn/ctid/card/manage/app/health/export",
        data=paramsPost,
        headers=headers,
        cookies=cookies,
    )
    print("download_health_status Status code:   %i" % response.status_code)
    with open(health_status_filename, "wb") as f:
        f.write(response.content)


if __name__ == "__main__":
    url = r"https://workcardmgr.easyctid.cn/#/login"
    username = "bjwjxhkj"
    password = "Bjwjxhkj@666"
    cookies = simulate_login(url, username, password)
    users_xlsx_filename = "template.xlsx"
    anxin_permit_result_filename = "anxin_permit_result.xlsx"
    add_anxin_permit(cookies, users_xlsx_filename, anxin_permit_result_filename)

    # date = str(datetime.date.today())
    # health_status_filename = 'health_status%s.xlsx'%date
    health_status_filename = "health_status.xlsx"
    download_health_status(cookies, health_status_filename)
