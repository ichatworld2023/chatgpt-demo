import { Show, createSignal, onMount } from 'solid-js'

interface InfoType { is_show: number, text: string }

export default () => {
  const [info, setInfo] = createSignal<InfoType>({ is_show: 1, text: '' })

  onMount(async() => {
    getInfo()
  })

  const getInfo = async() => {
    const response = await fetch('/api/cardkey', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const responseJson = await response.json()
    if (responseJson.code === 200)
      setInfo(responseJson.data)
  }
  return (
    <footer>
      <div mt-6 text-xs>
        {/* <div op-60>完全免费 无需魔法 无需登录 120次/天</div> */}

        <Show when={info().is_show === 0}>
          <div op-60>朋友你好👋, 元旦快乐! 2023感谢有你的支持和捐赠, 2024我们会不忘初心, 继续提供免费的GPT服务, 希望它能助你一臂之力, 祝愿各位在新的一年里所愿皆有所得。如果大家觉得本站点做得还不错, 请考虑打赏支持我们, 或向朋友分享我们的链接: <span id="copyLinkButton" class="gpt-subtitle text-xs cursor-pointer">https://chatz.free2gpt.xyz</span> 这对我们持续维护非常重要, 谢谢😘</div>
        </Show>

        <Show when={info().is_show === 1}>
          <div op-60>我们联合GPT4赞助商给大家送福利啦, 每日9点到10点送出8000字的GPT4兑换码, <a class=" gpt-subtitle text-xs" href="https://gpt4f.ninvfeng.xyz">登录</a>兑换就能用
            <p class="mt-1">{info().text}</p>
          </div>
        </Show>

        <div mt-2 op-60>收藏不迷路: <a class="gpt-subtitle text-xs" href="https://nav.free2gpt.xyz" target="_blank" rel="noreferrer">https://nav.free2gpt.xyz</a>🌟</div>
        <div mt-2><a class=" gpt-subtitle text-xs" href="https://gpt4f.ninvfeng.xyz">赞助商: 3.5不够聪明? 付费使用GPT4</a>😎</div>
        <div mt-2><a class=" gpt-subtitle text-xs" href="https://peiqishop.cn">赞助商: 佩奇商店,有售便宜稳定3.5和4.0 API Key</a>🦄</div>
      </div>
    </footer>
  )
}
