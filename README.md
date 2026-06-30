# FullStack Project 01: User Login (Using JavaScript Tech Stack🛠️)

## 💡[Preview]:
1. Front-end: HTML CSS JavaScript

2. Back-end: JavaScript Express(Framework) Node.js(Runtime Environment)
      
3. DataBase: MongoDB

4. Tips: if you decide to use Express and MongoDB and session, you must need to use **npm**, some commands as follow:
   
```
npm install express

npm install mongoose

npm install express-session
```
### 🔗[Get More]:https://wonderfulworld.feishu.cn/docx/RqZvdL3eRobcbux69Edc7EvBnYg

# How do I configure remote repositories for two GitHub account?🤔

## 👤[Double Accounts in GitHub]: Configuring Multiple SSH Accounts
*Configure multiple SSH accounts so that each repository clearly knows which account identity to use when interacting with the remote repository.*
| 使用SSH多账号配置，让每个仓库都明确知道自己该用哪个账号的身份去操作远程仓库

*The core idea is to generate distinct SSH keys for the two accounts and then configure different "host aliases" for them in the `.ssh/config` file, allowing each local repository to identify and select the appropriate GitHub account via its alias.*
 | 核心是：为两个账号生成不同的SSH密钥，然后在 .ssh/config 文件中为它们设置不同的“主机别名”，让每个本地仓库通过这个别名来识别和选择对应的GitHub账号

### 🗒️Steps as follow:
👉*1. Generate a separate **SSH key** for each account: Open the terminal and generate keys for Account A and Account B respectively, ensuring that the **filenames do not overlap**.*
 | 为每个账号生成独立的**SSH密钥**：打开终端，分别为账号A和账号B生成密钥，注意**文件名不能重复**
```
# 为账号A生成密钥
ssh-keygen -t rsa -C "your-email-a@example.com" -f ~/.ssh/id_rsa_a
# 为账号B生成密钥
ssh-keygen -t rsa -C "your-email-b@example.com" -f ~/.ssh/id_rsa_b
```
其中，`id_rsa_a`和`id_rsa_b`就是文件名，当我们执行命令：
````
ssh-keygen -t rsa -C "nieshiyi20060927@qq.com" -f ~/.ssh/id_rsa_a
````
系统就会在`~/.ssh/`目录下自动生成两个文件：

- `id_rsa_a` 这是私钥文件（保密，绝不能泄露）

- `id_rsa_a.pub` 这是公钥文件（需要上传到GitHub）

文件名自己可以随意取 eg：
```
# 为个人账号生成密钥
ssh-keygen -t rsa -C "personal@example.com" -f ~/.ssh/id_rsa_personal

# 为公司账号生成密钥  
ssh-keygen -t rsa -C "work@example.com" -f ~/.ssh/id_rsa_work
```
当然了，这个时候，对应的`~/.ssh/config`文件也要跟着改：
```
# 个人账号
Host github-personal
    ElevenNie11 github.com
    User git
    IdentityFile ~/.ssh/id_rsa_personal

# 公司账号
Host github-work
    ElevenNie11 github.com
    User git
    IdentityFile ~/.ssh/id_rsa_work
```

👉*2.Add the public keys to the corresponding GitHub accounts: log in to account A, go to `Settings` > `SSH and GPG keys`, and add the contents of `id_rsa_a.pub`. Do the same for account B by adding `id_rsa_b.pub`.*
 | 将公钥添加到对应的GitHub账号，登录账号A，在`Settings` -> `SSH and GPG keys` 中，添加`id_rsa_a.pub`的内容。账号B同理，添加`id_rsa_b.pub`

👉*3.Configure the `~/.ssh/config` file: Edit or create the `~/.ssh/config` file and add the following content. This file instructs Git to use the `id_rsa_a` key when accessing the alias `github-a`, and the `id_rsa_b` key when accessing `github-b`.* 
| 配置`~/.ssh/config`文件：编辑或创建`~/.ssh/config`文件，加入以下内容。这个文件告诉Git，当访`github-a`这个别名时，使用`id_rsa_a`密钥；访问`github-b`时，使用`id_rsa_b`密钥
```
# 账号A的配置
Host github-a
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_rsa_a

# 账号B的配置
Host github-b
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_rsa_b
```

👉*4.Set the remote repository address individually for each repository: in the local repository of Project A, modify the remote address by replacing `git@github.com:` with the alias you defined in your `config`.*
 | 为每个仓库单独设置远程仓库地址：在项目A的本地仓库中，修改远程地址，将`git@github.com`: 替换为你在`config`中定义的别名
 ```
# 进入项目A的本地文件夹
cd /path/to/project-a
# 修改远程地址，使用别名 github-a
git remote set-url origin git@github-a:username-a/repo-a.git

# 进入项目B的本地文件夹，进行类似操作
cd /path/to/project-b
git remote set-url origin git@github-b:username-b/repo-b.git
```
#### 完整地址： git@github-a:username-a/repo-a.git
1. git@                       固定的 SSH 用户名
2. github-a                   这是指我们在`~/.ssh/config`文件里自己取的别名
3. username-a/repo-a.git	这是指 GitHub 上的仓库位置（用户名/仓库名.git）

👉*Once this step is complete, `git push` or `git pull` operations in your respective repositories will automatically use the corresponding account identity—no need to switch manually!*
| 完成这一步后，你在各自的仓库里执行`git push`或`git pull`时，就会自动使用对应的账号身份了，无需手动切换😉

---

# ⚙️For Example: How to change and configure my another account？
### GitHub Account 01:
- Username: Nieshiyi11        (You can find this account in the GitHub!)
- email: ElevenNie11@gmail.com

### GitHub Account 02:
- Username: ElevenNie11
- email: nieshiyi20060927@qq.com

👉Tips: *You can find my first GitHub account(**Nieshiyi11**), which is primarily used for learning new technologies, while the second one(**ElevenNie11**) is used to document my projects😉*
  
#### [Step 01]: Generate a new SSH key for the new account(Filename:eleven)
```
ssh-keygen -t rsa -C "nieshiyi20060927@qq.com" -f ~/.ssh/id_rsa_eleven
```
After execution, check by running `ls ~/.ssh/`and you should see:
```
id_rsa_eleven        私钥（保密）
id_rsa_eleven.pub    公钥（要上传到GitHub）
```

#### [Step 02]: Add the public key to the new GitHub account
#### 👉Copy the public key content
```
cat ~/.ssh/id_rsa_eleven.pub
```
*Select the entire output (from "ssh-rsa" at the beginning to the email address at the end)!!!*

#### 👉Log in to your second GitHub account (username: `ElevenNie11`)

- Click your profile icon in the top-right corner → Settings.

- Select "`SSH and GPG keys`" from the left-hand menu.

- Click the green "`New SSH Key`" button.

- For "`Title`",you can write any name if you like.

- Paste the content you copied earlier into the "`Key`" field.

- Click "`Add SSH Key`"

#### [Step 03]: Modify `~/.ssh/config` file
👉Open `~/.ssh/config` using a text editor and **add the following content to the end of the file**:
```
# 第二个账号 ElevenNie11 的配置
Host github-eleven
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_rsa_eleven
```
---
```
# 第二个账号 ElevenNie11 的配置
Host github-eleven                      这是你自己取的别名（随便起）
    HostName github.com                 固定填 github.com（真实服务器）
    User git                            固定填 git
    IdentityFile ~/.ssh/id_rsa_eleven   指向对应的私钥文件
```
---

#### [Step 04]: Test whether the SSH connection is successful
```
ssh -T git@github-eleven

# If you see information similar to the following, the configuration was successful:

Hi ElevenNie11! You've successfully authenticated, but GitHub does not provide shell access.
```

#### [Step 05]: Configure the remote address for the new account's repository
> Suppose you have a repository named `FullStack01_UserLogin_JS` on your new account (`ElevenNie11`) and you already have this repository locally
##### 👉Modifying the remote URL of an existing repository
-  Enter your local repository content:
  ```
  cd /path/to/your/project
  ```
- View the current remote address:
  ```
  git remote -v
  # 会看到类似：origin  git@github.com:Nieshiyi11/FullStack01_UserLogin_JS.git
  ```
- Change to point to the new account:
  ```
  git remote set-url origin git@github-eleven:ElevenNie11/FullStack01_UserLogin_JS.git
  ```
- Review and confirm again:
  ```
  git remote -v
  #现在应该显示：origin  git@github-eleven:ElevenNie11/FullStack01_UserLogin_JS.git
  ```

  #### [Step 06]: Set the correct user information for the current repository⚠️
  > Since your global Git configuration likely still holds the details of the first account, you need to set user information specifically for this repository to prevent the wrong author from appearing in the commit history!

-  Enter your local repository content:
  ```
  cd /path/to/your/project
  ```
- Set the username and email for this repository (*affects only the current repository*):
  ```
  git config user.name "ElevenNie11"
  git config user.email "nieshiyi20060927@qq.com"
  ```
- Verification Settings:
  ```
  git config user.name
  git config user.email
  ```
<img width="488" height="211" alt="image" src="https://github.com/user-attachments/assets/88b592de-3ed9-415e-b657-95e420470f06" />

### [Tip]: 如果已经配好了一次SSH密钥，再启动新项目就不用再从头到尾再配置一次密钥了...直接使用 Bash 命令行即可：
```
#先看看自己的 HOST 是什么
cat ~/.ssh/config
```
并且在输出里找到类似于这样的部分：
```
Host xxxxx    ← 这后面的就是你自己取的名字
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_rsa_eleven
```
然后在GitHub网页里新建一个仓库，再关联远程仓库即可：
```
git remote add origin git@[HOST名字]:[GitHub用户名]/[新仓库名].git

git remote add origin git@github-eleven:ElevenNie11/PaySystem_Java.git
```
<img width="595" height="319" alt="image" src="https://github.com/user-attachments/assets/29d6807b-fedb-42d4-ab25-15750b034e7e" />
