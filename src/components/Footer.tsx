import { Index, Show, createSignal, onMount } from 'solid-js'
import { useClipboard } from 'solidjs-use'

interface InfoType { is_show: number, text: string, list: Array<any> }

export default () => {
  const [info, setInfo] = createSignal<InfoType>({ is_show: 1, text: '', list: [] })

  const [source] = createSignal('')
  const { copy } = useClipboard({ source, copiedDuring: 1000 })

  const copyAction = async(text) => {
    copy(text).then(() => {
      alert('复制成功')
    })
  }

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

{/*         <Show when={info().is_show === 0}> */}
          <div op-60>受OpenAI政策影响，上游token供应商大幅涨价，网站的维护成本大大增加。在现有token额度用完后，我们可能会暂时切换到谷歌的Gemini Pro模型，同时我们也会继续寻找便宜的GPT3.5渠道。如果您有相关资源欢迎联系我们: free2gpt@gmail.com ，我们将不忘初心，继续为大家提供免费服务, 感谢您的一路陪伴，您的赞赏和分享是我们持续维护的最大动力</div>
{/*         </Show> */}

        <Show when={info().is_show === 1}>
          <div op-60>
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
        <div mt-2><a class=" gpt-subtitle text-xs" href="https://peiqishop.cn">赞助商: 佩奇商店,有售便宜稳定3.5和4.0 API Key</a>🦄</div>
      </div>
    </footer>
  )
}
