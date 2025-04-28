import { useState } from 'react';
import users from './users.json';
import './App.css'; // 既存の装飾（.App-header など）
import backgroundImage from './background.jpg';  // 背景画像
import warships from './warships.json';

function App() {
  // 入力値
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // 状態管理
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [failCount, setFailCount] = useState(0);
  const [locked, setLocked] = useState(false);

  /*------------------------------
    ログイン処理
  ------------------------------*/
  const handleLogin = (e) => {
    e.preventDefault();

    if (locked) {
      alert('このアカウントはロックされています…');
      return;
    }

    // ユーザー名照合
    const matchUser = users.find((u) => u.user === username);

    if (!matchUser) {
      alert('ユーザー名が存在しません…');
      return;
    }

    // パスワード照合
    if (matchUser.pass === password) {
      setIsLoggedIn(true);
      setFailCount(0);        // 成功時はカウントリセット
    } else {
      const newCount = failCount + 1;
      setFailCount(newCount);

      if (newCount >= 3) {
        setLocked(true);
        alert('パスワードを3回間違えたためロックされました…');
      } else {
        alert(`パスワードが違います（${newCount}回目）`);
      }
    }
  };

  /*------------------------------
    ログアウト処理
  ------------------------------*/
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setFailCount(0);
    setLocked(false);
  };

  /*------------------------------
    呉生まれ艦艇管理
  ------------------------------*/
  const Warships = () => {
    const randomIndex = Math.floor(Math.random() * warships.length);
    const selectedShip = warships[randomIndex];
  
    alert(`艦名：${selectedShip.name}\n艦種：${selectedShip.type}\n進水：${selectedShip.year}年`);
  };
  /*------------------------------
    背景画像切替管制
  ------------------------------*/
  const [useBackgroundImage, setUseBackgroundImage] = useState(false);
  const toggleBackground = () => {
  setUseBackgroundImage((prev) => !prev);  // trueならfalseへ、falseならtrueへ切り替え
  };
  /*==============================
    表示切り替え
  ==============================*/

  // ログイン後画面
  if (isLoggedIn) {
    return (
      <div className="App-header"
      style={{
        backgroundImage: useBackgroundImage ? `url(${backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
      >
        <h1 className='no-select'>ようこそ、{username}さん！</h1>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        {/* 呉ボタン*/}
        <button
          onClick={Warships}
          className="button">
          呉生まれの艦艇
        </button>
        {/* 背景切替 */}
        <button
          onClick={toggleBackground}
          className="button">
          背景切替
        </button>
        {/* ログアウト */}
        <button 
        onClick={handleLogout}
        className="button">
        ログアウト
        </button>
        </div>
      </div>
    );
  }

  // ロック状態の警告（任意表示）
  const lockMessage = locked
    ? '※このアカウントはロック中です'
    : '（パスワード3回間違いでロック）';

  // ログインフォーム
  return (
    <div className="App-header">
      <h1 className='no-select'> ログインしてください</h1>
      <p style={{ fontSize: '0.9rem', color: locked ? 'red' : 'inherit' }}className='no-select'>
        {lockMessage}
      </p>

      <form onSubmit={handleLogin}>
        <div className="input-group">
         <label>ユーザー名：</label>
          <input
           className="input-box"
           value={username}
           onChange={(e) => setUsername(e.target.value)}
           placeholder="ユーザー名"
          />
        </div>
        <div className="input-group">
         <label>パスワード：</label>
         <input
          type="password"
          className="input-box"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワード"
         />
        </div>
        <div className="button-area">
        <button type="submit" disabled={locked}className="button">
          ログイン
        </button>
        </div>
      </form>
    </div>
  );
}

export default App;