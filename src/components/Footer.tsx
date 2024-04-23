import { Index, Show, createSignal, onMount } from 'solid-js'
// import { useClipboard } from 'solidjs-use'

interface InfoType { is_show: number, text: string, list: Array<any> }

export default () => {
  const [info, setInfo] = createSignal<InfoType>({ is_show: 1, text: '', list: [] })
  const [host, setHost] = createSignal('')

  // const [source] = createSignal('')
  // const { copy } = useClipboard({ source, copiedDuring: 1000 })

  // const copyAction = async(text) => {
  //   copy(text).then(() => {
  //     alert('复制成功')
  //   })
  // }

  onMount(async() => {
    getInfo()
    setHost(window.location.host)
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

        <Show when={host() !== 'llama3.free2gpt.xyz'}>
          <div op-60>完全免费 无需魔法 无需登录 120次/天 gemini-pro模型, 我们希望能尽快用上llama3 70B模型, 但目前还不稳定, 为此我们在保证gemini-pro稳定的情况下单独搭建 <a class=" gpt-subtitle text-xs" href="https://llama3.free2gpt.xyz">llama3 70B站点</a> 给大家尝鲜, 欢迎试用反馈</div>
        </Show>

        <Show when={host() === 'llama3.free2gpt.xyz'}>
          <div op-60>完全免费 无需魔法 无需登录 120次/天 Meta最新发布的llama3 70B模型, 新模型是否好用? 期待您的反馈, 您的赞赏和分享是我们持续维护的最大动力🥹 <a class=" gpt-subtitle text-xs" href="https://chatz.free2gpt.xyz">返回使用gemini-pro模型</a></div>
        </Show>

        <Show when={info().is_show === 1}>
          <div op-60 mt-2>
            <div>
              我们联合GPT4赞助商给大家送福利啦, 每日不定时送出8000字的GPT4兑换码, <a class=" gpt-subtitle text-xs" href="https://gpt4f.ninvfeng.xyz">登录</a>兑换就能用
            </div>
            <div class="mt-1 flex flex-wrap text-xs">
              <Index each={info().list}>
                {v => (
                  <div class="mr-1">
                    <Show when={v().status === '正常'}>
                      {`${v().code} `}
                    </Show>
                    <Show when={v().status === '已使用'}>
                      <span class="op-60">{`${v().code}已用 `}</span>
                    </Show>
                  </div>
                )}
              </Index>
            </div>
          </div>
        </Show>

        <div mt-2 op-60>收藏不迷路: <a class="gpt-subtitle text-xs" href="https://nav.free2gpt.xyz" target="_blank" rel="noreferrer">https://nav.free2gpt.xyz</a>🌟</div>
        <div mt-2><a class=" gpt-subtitle text-xs" href="https://gpt4f.ninvfeng.xyz">赞助商: 3.5不够聪明? 付费使用GPT4</a>😎</div>
        {/* <div mt-2><a class=" gpt-subtitle text-xs" href="https://www.gptapi.us/?re=free2gpt">赞助商: GPTAPI.US, 全网最低价的GPT系列 API</a>🦄</div> */}
      </div>
    </footer>
  )
}
