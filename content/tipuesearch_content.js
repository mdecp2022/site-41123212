var tipuesearch = {"pages": [{'title': 'HW', 'text': '', 'tags': '', 'url': 'HW.html'}, {'title': 'w10', 'text': '# 導入 ast 模組是希望利用其 literal_eval() 將 dict 格式的字串轉為 dict 資料型別\n# 以利隨後的取值運算\nimport ast\n# 定義一個函式, 以班級代號字串作為輸入, 可以傳回各班修課學員的學號數列\ndef get_stud(c_name):\n    # 將課程的班級代號字串作為 dict 的 key, 而 2022 fall 的課程代號作為對應值\n    # 使用者可以利用班級代號從 courses dict 取出課程代號\n    courses = {"1a": "0747", "1b": "0761", "2a": "0773", "2b": "0786"}\n    # 利用 c_name 從 courses 得到該學期的課程代號\n    c = courses[c_name]\n    # 利用課程代號從學校教務主機取的該班修課人員名單\n    url = "https://nfu.cycu.org/?semester=1111&courseno=" + c + "&column=True"\n    # 讀出各修課人員資料後, 以跳行符號切割, 得到的 data 為數列\n    data = open(url).read().split("\\n")\n    # 因為最後一筆資料為空字串, 因此利用數列運算將其去除\n    stud = data[:-1]\n    # get_stud() 函式最後將對應班級的修課人員學號以數列格式傳回\n    return stud\n# 利用 "1b" 作為輸入從 get_stud() 取出該班修課學員學號數列\ncp_stud = get_stud("1b")\n# get w10 quiz result\n# # 以下為 1b w10 quiz 考試結果的 JSON 檔案\ncp_w10_quiz_url = "https://gist.githubusercontent.com/mdecycu/9df4b372ac1b7386cf259ced15f1a2b2/raw/a6825f13b1bb0b61e09e74dd117729eefe1d947f/20221110_cp1b_w10_quiz.json"\ndef get_score(url):\n    # 利用 open() 與 read() 讀取考試結果 JSON 檔案\n    json_data = open(url).read()\n    # 利用 ast.literal_eval() 將字串 dict, 轉為程式可用的 dict 資料型別\n    big_dict = ast.literal_eval(json_data)\n    # 從 big_dict 中, 取出 body 中的 testuser 欄位資料\n    data = big_dict["body"]["testuser"]\n    # 定義一個空 dict 資料變數, 隨後利用迴圈逐一將學號作為 key, 考試成績為 valude\n    # 組成 quiz_dict 的資料內容, 以便之後可以用學號當作輸入, 取得該員考試成績\n    quiz_dict = {}\n    for i in data:\n        # data 資料中的 user_name 為考試學員的帳號, 也就是學號\n        stud_id = data[i]["user_name"]\n        # data 資料中的 total_score 欄位為考試成績\n        # 因為考試成績為字串, 先轉為浮點數後, 再轉為整數\n        stud_score = int(float(data[i]["total_score"]))\n        # 逐一以學號為 key, 考試成績為對應 value, 將資料放入 quiz_dict\n        quiz_dict[stud_id] = stud_score\n    # 取得各學員的考試成績 quiz_dict 後, 將資料傳回\n    return quiz_dict\n# 從考試 JSON 檔案中取得考試結果的字典資料\ncp_quiz = get_score(cp_w10_quiz_url)\n# 設定一個空數列, 隨後將利用 append() 方法, 將缺考學員學號存入\ncp_abs = []\n# 從修課學員數列中, 逐一按照學號次序, 以重複迴圈將學號對應至 stud 變數\nfor stud in cp_stud:\n    # 因為缺考學員在考試結果的 dict 中並無資料, 因此利用 try except 進行判斷\n    try:\n        # 針對 stud 學號, 有考試成績者, 列出其學號與得分\n        print(stud, cp_quiz[stud])\n    except:\n        # 缺考者沒有 quiz 成績, 則在其成績欄位印出"缺"\n        print(stud, "缺")\n        # 同時將缺考學員學號以 append() 方法逐一置入\n        cp_abs.append(stud)\n# 列出缺考名單\nprint("="*20)\nprint("以下為 w10 缺考名單:")\n# 因為 cp_abs 資料為 list, 在此利用 for 迴圈逐一列出\nfor stud in cp_abs:\n    print(stud) \n', 'tags': '', 'url': 'w10.html'}, {'title': 'w11', 'text': 'import ast\n# get stud_list first\ndef get_stud(c_name):\n    courses = {"1a": "0747", "1b": "0761", "2a": "0773", "2b": "0786"}\n    #c_name = "1b"\n    c = courses[c_name]\n    url = "https://nfu.cycu.org/?semester=1111&courseno=" + c + "&column=True"\n    data = open(url).read().split("\\n")\n    stud = data[:-1]\n    return stud\n     \ncp_stud = get_stud("1b")\n# get w10 quiz result\ncp_w11_quiz_url = "https://gist.githubusercontent.com/mdecycu/9df4b372ac1b7386cf259ced15f1a2b2/raw/8e59f90d8ff4f1ad4fecd4f7ee159f91eb6addf9/cp1b_w11_quiz_result.json"\ncp_w10_quiz_url = "https://gist.githubusercontent.com/mdecycu/9df4b372ac1b7386cf259ced15f1a2b2/raw/a6825f13b1bb0b61e09e74dd117729eefe1d947f/20221110_cp1b_w10_quiz.json"\ndef get_score(url):\n    num_stud = 0\n    total_score = 0\n    json_data = open(url).read()\n    big_dict = ast.literal_eval(json_data)\n    data = big_dict["body"]["testuser"]\n    quiz_dict = {}\n    for i in data:\n        stud_id = data[i]["user_name"]\n        stud_score = int(float(data[i]["total_score"]))\n        quiz_dict[stud_id] = stud_score\n        num_stud = num_stud + 1\n        total_score = total_score + stud_score\n    return quiz_dict, num_stud, total_score\n     \n#cp_quiz, num_stud, total_score = get_score(cp_w10_quiz_url)\ncp_quiz, num_stud, total_score = get_score(cp_w11_quiz_url)\ncp_abs = []\nfor stud in cp_stud:\n    try:\n        print(stud, cp_quiz[stud])\n    except:\n        # 缺考者沒有 quiz 成績\n        print(stud, "缺")\n        cp_abs.append(stud)\nprint("\\n考試平均分數為:", int(total_score/num_stud))\n# 列出缺考名單\nprint("="*20)\nprint("以下為 w10 缺考名單:")\nfor stud in cp_abs:\n    print(stud) \n', 'tags': '', 'url': 'w11.html'}, {'title': 'w12', 'text': '輸入攝氏的溫度值 \n # Brython 的 input() 可以接受輸入提示字串, 跳出瀏覽器輸入表單後, 將輸入內容以字串取回\nuser_input_temp = input("請輸入攝氏溫度值:")\n# 接著列出 user_input_temp 變數的資料型別\nprint(type(user_input_temp)) \n 回傳出攝氏和華氏的溫度值 \n # Brython 的 input() 可以接受輸入提示字串, 跳出瀏覽器輸入表單後, 將輸入內容以字串取回\nuser_input_temp = input("請輸入攝氏溫度值:")\n# 接著列出 user_input_temp 變數的資料型別\nprint(type(user_input_temp))\n# 到這裡已知利用 input() 函式將傳回字串, 接著以 float() 將字串轉為浮點數\nuser_input_temp = float(user_input_temp)\n# 因為攝氏溫度乘上 9/5 之後再加上 32 就可以得到對應的華氏溫度值\nFahrenheit = (user_input_temp*9/5) + 32\n# 到這裡, Fahrenheit 資料型別為浮點數, 而 user_input_temp 在第 8 行也轉為浮點數\n# 要將兩個浮點數與字串相加, 都必須透過 str() 轉為字串\nprint("攝氏 " + str(user_input_temp) + " 度, 等於華氏 " + str(Fahrenheit) + " 度.")\n \n', 'tags': '', 'url': 'w12.html'}, {'title': 'w13', 'text': '\'\'\'\nf = c*9/5 + 32\nc = (f-32)*5/9\n\'\'\'\nc = input("請輸入攝氏溫度值")\nc = float(c)\nprint(c, type(c)) \n 將 iterable 與 iterator\xa0 相關說明 , 利用 Brython 與 Ace Editor 整理在這個頁面. \n \'\'\'\nf = c*9/5 + 32\nc = (f-32)*5/9\n\'\'\'\nc = input("請輸入攝氏溫度值")\nc = float(c)\n#print(c, type(c))\nf = c*9/5 + 32\nprint(c, f) \n Filename: \xa0 .py \xa0 \n \n \n \n Run \xa0 Output \xa0 清除輸出區 清除繪圖區 Reload \n \n \n \n \n \n \n', 'tags': '', 'url': 'w13.html'}, {'title': 'w14', 'text': 'w14缺考及成績名單 \n --修改w11的程式-- \n >從teams copy 下程式後，透過老師給的w14json檔，修改裡面的程式將w10的json替換成w14 \n # 導入 ast 模組是希望利用其 literal_eval() 將 dict 格式的字串轉為 dict 資料型別\n# 以利隨後的取值運算\nimport ast\n# 定義一個函式, 以班級代號字串作為輸入, 可以傳回各班修課學員的學號數列\ndef get_stud(c_name):\n    # 將課程的班級代號字串作為 dict 的 key, 而 2022 fall 的課程代號作為對應值\n    # 使用者可以利用班級代號從 courses dict 取出課程代號\n    courses = {"1a": "0747", "1b": "0761", "2a": "0773", "2b": "0786"}\n    # 利用 c_name 從 courses 得到該學期的課程代號\n    c = courses[c_name]\n    # 利用課程代號從學校教務主機取的該班修課人員名單\n    url = "https://nfu.cycu.org/?semester=1111&courseno=" + c + "&column=True"\n    # 讀出各修課人員資料後, 以跳行符號切割, 得到的 data 為數列\n    data = open(url).read().split("\\n")\n    # 因為最後一筆資料為空字串, 因此利用數列運算將其去除\n    stud = data[:-1]\n    # get_stud() 函式最後將對應班級的修課人員學號以數列格式傳回\n    return stud\n# 利用 "1b" 作為輸入從 get_stud() 取出該班修課學員學號數列\ncp_stud = get_stud("1b")\n# get w10 quiz result\n# # 以下為 1b w10 quiz 考試結果的 JSON 檔案\ncp_w14_quiz_url = "https://gist.githubusercontent.com/mdecycu/9df4b372ac1b7386cf259ced15f1a2b2/raw/a0be253dc36fb3d0d2e1878950dae0b13d07a8f6/2022_1208_cp_w14_1b_quiz.json"\ndef get_score(url):\n    # 利用 open() 與 read() 讀取考試結果 JSON 檔案\n    json_data = open(url).read()\n    # 利用 ast.literal_eval() 將字串 dict, 轉為程式可用的 dict 資料型別\n    big_dict = ast.literal_eval(json_data)\n    # 從 big_dict 中, 取出 body 中的 testuser 欄位資料\n    data = big_dict["body"]["testuser"]\n    # 定義一個空 dict 資料變數, 隨後利用迴圈逐一將學號作為 key, 考試成績為 valude\n    # 組成 quiz_dict 的資料內容, 以便之後可以用學號當作輸入, 取得該員考試成績\n    quiz_dict = {}\n    for i in data:\n        # data 資料中的 user_name 為考試學員的帳號, 也就是學號\n        stud_id = data[i]["user_name"]\n        # data 資料中的 total_score 欄位為考試成績\n        # 因為考試成績為字串, 先轉為浮點數後, 再轉為整數\n        stud_score = int(float(data[i]["total_score"]))\n        # 逐一以學號為 key, 考試成績為對應 value, 將資料放入 quiz_dict\n        quiz_dict[stud_id] = stud_score\n    # 取得各學員的考試成績 quiz_dict 後, 將資料傳回\n    return quiz_dict\n# 從考試 JSON 檔案中取得考試結果的字典資料\ncp_quiz = get_score(cp_w14_quiz_url)\n# 設定一個空數列, 隨後將利用 append() 方法, 將缺考學員學號存入\ncp_abs = []\n# 從修課學員數列中, 逐一按照學號次序, 以重複迴圈將學號對應至 stud 變數\nfor stud in cp_stud:\n    # 因為缺考學員在考試結果的 dict 中並無資料, 因此利用 try except 進行判斷\n    try:\n        # 針對 stud 學號, 有考試成績者, 列出其學號與得分\n        print(stud, cp_quiz[stud])\n    except:\n        # 缺考者沒有 quiz 成績, 則在其成績欄位印出"缺"\n        print(stud, "缺")\n        # 同時將缺考學員學號以 append() 方法逐一置入\n        cp_abs.append(stud)\n# 列出缺考名單\nprint("="*20)\nprint("以下為 w14 缺考名單:")\n# 因為 cp_abs 資料為 list, 在此利用 for 迴圈逐一列出\nfor stud in cp_abs:\n    print(stud) \n', 'tags': '', 'url': 'w14.html'}, {'title': 'W15', 'text': "\n 1.為何學習計算機程式需要建立個人倉儲? \n \xa0 A:作業需要在上面做 \n 2.全球資訊網能夠提供甚麼功能或有什麼優點? \n \xa0 A:更便捷的網路服務系統 \n 3.Replit, stud.cycu.org 與 localhost 分別代表甚麼? \n Replit \xa0 是提供線上集成開發環境 服務的公司 \n localhost 是一個在電腦網路中用於表示「此電腦」的主機名。它被用於通過本地環回網路介面，來存取本機執行的服務，並且將會繞過任何物理網路介面硬體。 \n 4.https, ssh 到底提供使用者那些功能或優點? \n 安全外殼協定 （Secure Shell Protocol，簡稱 SSH ）是一種加密的網路傳輸協定，可在不安全的網路中為網路服務提供安全的傳輸環境 。 \n 5.Brython 與 Python 有甚麼差別? \n Python的優點之一是REPL（read-eval-print循環）。在線Brython控制台提供了一個平台，可以測試，測試和調試某些代碼段的行為。' \n Brython不是在瀏覽器中編寫Python代碼的唯一選擇。 \n 6.能夠直接在瀏覽器中以 Brython 繪製中華民國國旗, 或模擬綠色方塊在方塊格點中任意移動, 代表甚麼? \n yes,we did it \n 7.變數, 字串, 整數, 浮點數, 數列, Tuple, Dictionary, 函式, 重複迴圈, class, 物件導向, 資料庫, 這些名詞對您而言代表甚麼? \n 很困難 \n \n", 'tags': '', 'url': 'W15.html'}, {'title': 'w16', 'text': '\n rect_walk \n  納入 Brython 環境  \n \n \n  啟動 Brython  \n \n \n  給定 brython_div1 division 標註  \n \n  加入啟動按鈕後的 Rect 行走程式原始碼  \n \n # 這個程式用於 demo 綠色方塊沿著特定網格路徑行走\n# 從 Brython 程式庫中的 browser 模組導入 document 類別, 並以簡寫設定為 doc\nfrom browser import document as doc\n# 從 browser 模組導入 html 類別, 主要用於建立 CANVAS 標註物件, 並插入頁面中\nfrom browser import html\n# 用於定時執行特定函式\nimport browser.timer\n# 導入亂數模組\nfrom random import random, randint\n \n  \n \n# 利用 html 建立一個 CANVAS 標註物件, 與變數 canvas 對應\ncanvas = html.CANVAS(width = 600, height = 600)\n# 將 canvas 標註的 id 設為 "canvas"\ncanvas.id = "canvas"\n# 將 document 中 id 為 "brython_div" 的標註 \n# 設為與 brython_div 變數對應\nbrython_div = doc["brython_div1"]\n \n  \n \n# 建立 buttons\nbrython_div <= html.BUTTON("啟動", id="power")\nbrython_div <= html.BR()\n \n  \n \n# 將 canvas 標註放入 brython_div1 所在位置\n# 頁面中原本就已經放入 <div id="brython_div"></div> 標註\nbrython_div <= canvas\n# 將頁面中 id 為 canvas 的 CANVAS 設為與 canvas 變數對應\ncanvas = doc["canvas"]\n# 將 canvas 的 2d 繪圖 context 命名為 ctx\nctx = canvas.getContext("2d")\n \n  \n \n# 建立一個 dRect() 函式\n# s default 為 1, c defaul 為紅色\ndef dRect(lux, luy, w, h, s=1, c=\'#ff0000\'):\n    ctx.lineWidth = s\n    ctx.strokeStyle = c\n    ctx.beginPath();\n    ctx.rect(lux, luy, w, h)\n    ctx.stroke();\n \n# 建立畫直線函式\ndef draw_line(x1, y1, x2, y2, color="#ff0000"):\n    ctx.beginPath()\n    ctx.moveTo(x1, y1)\n    ctx.lineTo(x2, y2)\n    ctx.strokeStyle = color\n    ctx.stroke()\n \n  \n \n# 建立 write Text 函式\ndef wText(x, y, t, s=14, c=\'#0000ff\'):\n    ctx.font = str(s) + "px Arial";\n    ctx.fillText(t, x, y)\n \n  \n \n# 定義畫格線的函式\ndef grid(startx, starty, w, h, wnum, hnum, pixel=1, color="#ff0000"):\n    # 利用迴圈與座標增量繪圖\n    # 因為輸入 wnum 與 hnum 為格子數, 畫格線數則需加上 1\n    for i in range(wnum+1):\n        for j in range(hnum+1):\n            # 畫上下直線\n            yend = starty + h*(hnum)\n            xend = startx + w*(wnum)\n            x = startx + i*w\n            draw_line(x, starty, x, yend, color)\n            # 畫左右直線\n            y = starty + j*h\n            draw_line(startx, y, xend, y, color)\n            #wText(w/2-10, y-w/2, str(j))\n \n  \n \n# 從兩個座標點求中心點座標\ndef center(lx, ly, rx, ry):\n    # lx is x coord of the left up corner\n    # rx is the x coord of th right down corner\n    x = (lx + rx)/2\n    y = (ly + ry)/2\n    return x, y\n \n# 畫出填色方塊\ndef draw_rect(gx, gy, gw, gh, color="lime"):\n    # gx is the grid coord at x direction\n    # gy is the grid coord at y direction\n    # gw is the with of the green rect\n    # gh is the height of the green rect\n    lx = origx + (gx-1)*w\n    ly = origy + (gy-1)*h\n    rx = origx + gx*w\n    ry = origy + gy*h\n    cx, cy = center(lx, ly, rx, ry)\n    # glx is the x coord of the left corner\n    # gly is the y coord of the left corner\n    glx = cx - gw/2\n    gly = cy - gh/2\n    # 利用設定的顏色值畫出 rectangle\n    ctx.fillStyle = color\n    ctx.fillRect(glx, gly, gw, gh)\n \n  \n \n# 以白色覆蓋位於 (nowx, nowy) \n# 且比目標方塊長寬各大於 1 pixel的方塊\ndef wipe():\n    draw_rect(nowx, nowy, 30+1, 30+1, color="white")\n \n  \n \n# 畫出位於 (nowx, nowy) 的綠色方塊\ndef draw():\n    draw_rect(nowx, nowy, 30, 30, color="lime")\n \n  \n \n# 繞著外圍行走\ndef walk():\n    global stepx, stepy\n    # 向下\n    if nowy < hnum and nowx == 1:\n        stepx = 0\n        stepy = 1\n    # 向右\n    elif nowx < wnum and nowy == hnum:\n        stepx = 1\n        stepy = 0\n    # 向上\n    elif nowy == hnum and nowx == wnum:\n        stepx = 0\n        stepy = -1\n    # 向左\n    elif nowx == wnum and nowy == 1:\n        stepx = -1\n        stepy = 0\n \n# 每隔短暫時間即呼叫執行一次的函式\ndef game():\n    # 因 nowx 與 nowy 在函式外宣告\n    # 且在函式內改變對應值, 因此需宣告為 global\n    global nowx, nowy\n    walk()\n    wipe()\n    nowx += stepx\n    nowy += stepy\n    draw()\n \n  \n \n# 將 anim 設為 None\nanim = None\n \ndef launchAnimation(ev):\n    global anim\n    # 初始啟動, anim 為 None\n    if anim is None:\n        # 每 0.08 秒執行一次 draw 函式繪圖\n        #anim = timer.set_interval(draw, 80)\n        anim = browser.timer.set_interval(game, 100)\n        # 初始啟動後, 按鈕文字轉為"暫停"\n        doc[\'power\'].text = \'暫停\'\n    elif anim == \'hold\':\n        # 當 anim 為 \'hold\' 表示曾經暫停後的啟動, 因此持續以 set_interval() 持續旋轉, 且將 power 文字轉為"暫停"\n        #anim = timer.set_interval(draw, 80)\n        anim = browser.timer.set_interval(game, 100)\n        doc[\'power\'].text = \'暫停\'\n    else:\n        # 初始啟動後, 使用者再按 power, 此時 anim 非 None 也不是 \'hold\', 因此會執行 clear_interval() 暫停\n        # 且將 anim 變數設為 \'hold\', 且 power 文字轉為"繼續"\n        #timer.clear_interval(anim)\n        browser.timer.clear_interval(anim)\n        anim = \'hold\'\n        doc[\'power\'].text = \'繼續\'\n \n# 綠色方塊起點座標與 x 及 y 方向的座標增量\nnowx = 1\nnowy = 1\nstepx = 0\nstepy = 0\n# 設定格數\n# width 方向格子數\nwnum = 15\n# height 方向格子數\nhnum = 15\n# 設定線寬\npixel = 1\n# 設定 w 寬度\nw = int(canvas.width/wnum) - pixel\n# 設定 h 高度\nh = int(canvas.height/hnum) - pixel\n# 設定繪圖座標點起點位置\norigx = 1\norigy = 1\n# 利用 grid 函式畫出格線\ngrid(origx, origy, w, h, wnum, hnum, pixel=1, color="black") \n  納入 Brython 環境  \n \n \n \n \n  啟動 Brython  \n \n \n  給定 brython_div1 division 標註  \n \n  加入啟動按鈕後的 Rect 行走程式原始碼  \n \n \n', 'tags': '', 'url': 'w16.html'}, {'title': 'About', 'text': 'cmsite: wcms use  https://github.com/mdecycu/cmsimde  as submodule \n', 'tags': '', 'url': 'About.html'}, {'title': 'cp2022', 'text': 'test \n https://en.wikipedia.org/wiki/Python_(programming_language) \n Examples: \n https://gist.github.com/mdecycu/d9082d678096bd58378d6afe2c7fa05d \n https://www.geeksforgeeks.org/python-programming-examples/ \n https://www.programiz.com/python-programming/examples \n https://www.freecodecamp.org/news/python-code-examples-sample-script-coding-tutorial-for-beginners/ \n Python Tutorial: \n https://docs.python.org/3/tutorial/ \n An informal introduction to Python \n Indentation \n Variables \n Comments \n Numbers \n Strings \n print \n Python control flow tools \n for \n if \n range \n open \n read \n lists \n tuples \n dictionaries \n functions \n try ... except \n break \n pass \n classes \n 這個頁面 demo 如何在同一頁面下納入多個線上 Ace 編輯器與執行按鈕 ( practice_html.txt  動態頁面超文件). \n practice_html.txt  動態頁面超文件應該可以在啟動 Brython 時, 設定將 .py 檔案放入 downloads/py 目錄中引用. \n 亦即將所有對應的 html 也使用 Brython 產生, 然後寫為  class  後, 在範例導入時透過  instance  引用. \n <!-- 啟動 Brython -->\n<script>\nwindow.onload=function(){\nbrython({debug:1, pythonpath:[\'./../cmsimde/static/\',\'./../downloads/py/\']});\n}\n</script> \n 從 1 累加到 100: \n 1 add to 100 \n 將 iterable 與 iterator  相關說明 , 利用 Brython 與 Ace Editor 整理在這個頁面. \n  導入 brython 程式庫  \n \n \n \n \n  啟動 Brython  \n \n \n \n  導入 FileSaver 與 filereader  \n \n \n \n \n  導入 ace  \n \n \n \n \n \n \n  導入 gearUtils-0.9.js Cango 齒輪繪圖程式庫  \n \n \n \n \n \n \n  請注意, 這裡使用 Javascript 將 localStorage["kw_py_src1"] 中存在近端瀏覽器的程式碼, 由使用者決定存檔名稱 \n \n \n \n \n \n \n  add 1 to 100 開始  \n \n \n  add 1 to 100 結束 \n  editor1 開始  \n  用來顯示程式碼的 editor 區域  \n \n  以下的表單與按鈕與前面的 Javascript doSave 函式以及 FileSaver.min.js 互相配合  \n  存擋表單開始  \n Filename:  .py   \n  存擋表單結束  \n \n  執行與清除按鈕開始  \n Run   Output   清除輸出區 清除繪圖區 Reload \n  執行與清除按鈕結束  \n \n  程式執行 ouput 區  \n \n  Brython 程式執行的結果, 都以 brython_div1 作為切入位置  \n \n  editor1 結束   ##########################################  \n 從 1 累加到 100 part2: \n 1 add to 100 cango_three_gears BSnake AI Tetris Rotating Block \n  請注意, 這裡使用 Javascript 將 localStorage["kw_py_src2"] 中存在近端瀏覽器的程式碼, 由使用者決定存檔名稱 \n \n \n \n  add 1 to 100 part2 開始  \n \n \n  add 1 to 100 part2 結束 \n  editor2 開始  \n  用來顯示程式碼的 editor 區域  \n \n  以下的表單與按鈕與前面的 Javascript doSave 函式以及 FileSaver.min.js 互相配合  \n  存擋表單開始  \n Filename:  .py   \n  存擋表單結束  \n \n  執行與清除按鈕開始  \n Run   Output   清除輸出區 清除繪圖區 Reload \n  執行與清除按鈕結束  \n \n  程式執行 ouput 區  \n \n  Brython 程式執行的結果, 都以 brython_div1 作為切入位置  \n \n  editor2 結束  \n \n', 'tags': '', 'url': 'cp2022.html'}, {'title': 'Brython', 'text': 'https://en.wikipedia.org/wiki/Python_(programming_language) \n Examples: \n https://gist.github.com/mdecycu/d9082d678096bd58378d6afe2c7fa05d \n https://www.geeksforgeeks.org/python-programming-examples/ \n https://www.programiz.com/python-programming/examples \n https://www.freecodecamp.org/news/python-code-examples-sample-script-coding-tutorial-for-beginners/ \n Python Tutorial: \n https://docs.python.org/3/tutorial/ \n An informal introduction to Python \n Indentation \n Variables \n Comments \n Numbers \n Strings \n print \n Python control flow tools \n for \n if \n range \n open \n read \n lists \n tuples \n dictionaries \n functions \n try ... except \n break \n pass \n classes \n 這個頁面 demo 如何在同一頁面下納入多個線上 Ace 編輯器與執行按鈕 ( practice_html.txt  動態頁面超文件). \n practice_html.txt  動態頁面超文件應該可以在啟動 Brython 時, 設定將 .py 檔案放入 downloads/py 目錄中引用. \n 亦即將所有對應的 html 也使用 Brython 產生, 然後寫為  class  後, 在範例導入時透過  instance  引用. \n <!-- 啟動 Brython -->\n<script>\nwindow.onload=function(){\nbrython({debug:1, pythonpath:[\'./../cmsimde/static/\',\'./../downloads/py/\']});\n}\n</script> \n 從 1 累加到 100: \n 1 add to 100 \n 將 iterable 與 iterator  相關說明 , 利用 Brython 與 Ace Editor 整理在這個頁面. \n  導入 brython 程式庫  \n \n \n \n \n  啟動 Brython  \n \n \n \n  導入 FileSaver 與 filereader  \n \n \n \n \n  導入 ace  \n \n \n \n \n \n \n  導入 gearUtils-0.9.js Cango 齒輪繪圖程式庫  \n \n \n \n \n \n \n  請注意, 這裡使用 Javascript 將 localStorage["kw_py_src1"] 中存在近端瀏覽器的程式碼, 由使用者決定存檔名稱 \n \n \n \n \n \n \n  add 1 to 100 開始  \n \n \n  add 1 to 100 結束 \n  editor1 開始  \n  用來顯示程式碼的 editor 區域  \n \n  以下的表單與按鈕與前面的 Javascript doSave 函式以及 FileSaver.min.js 互相配合  \n  存擋表單開始  \n Filename:  .py   \n  存擋表單結束  \n \n  執行與清除按鈕開始  \n Run   Output   清除輸出區 清除繪圖區 Reload \n  執行與清除按鈕結束  \n \n  程式執行 ouput 區  \n \n  Brython 程式執行的結果, 都以 brython_div1 作為切入位置  \n \n  editor1 結束   ##########################################  \n 從 1 累加到 100 part2: \n 1 add to 100 cango_three_gears BSnake AI Tetris \n  請注意, 這裡使用 Javascript 將 localStorage["kw_py_src2"] 中存在近端瀏覽器的程式碼, 由使用者決定存檔名稱 \n \n \n \n  add 1 to 100 part2 開始  \n \n \n  add 1 to 100 part2 結束 \n  editor2 開始  \n  用來顯示程式碼的 editor 區域  \n \n  以下的表單與按鈕與前面的 Javascript doSave 函式以及 FileSaver.min.js 互相配合  \n  存擋表單開始  \n Filename:  .py   \n  存擋表單結束  \n \n  執行與清除按鈕開始  \n Run   Output   清除輸出區 清除繪圖區 Reload \n  執行與清除按鈕結束  \n \n  程式執行 ouput 區  \n \n  Brython 程式執行的結果, 都以 brython_div1 作為切入位置  \n \n  editor2 結束 ', 'tags': '', 'url': 'Brython.html'}]};