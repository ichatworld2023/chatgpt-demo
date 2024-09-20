import { Index, Show, createSignal, onMount } from 'solid-js'
// import { useClipboard } from 'solidjs-use'

interface InfoType { is_show: number, text: string, list: Array<any> }

export default () => {
  const [info, setInfo] = createSignal<InfoType>({ is_show: 1, text: '', list: [] })
  const [host, setHost] = createSignal('')
  const [show, setShow] = createSignal(0)

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

        <div op-60>完全免费 无需魔法 无需登录 120次/天 <span class="op-0">免费ChatGPT</span></div>

        <div mt-2 op-60>请保存新域名: <a class="gpt-subtitle text-xs" href="https://nav.free2gpt.com" target="_blank" rel="noreferrer">https://nav.free2gpt.com</a>🌟</div>
        <div mt-2><a class=" gpt-subtitle text-xs" href="https://gpt4f.ninvfeng.xyz">赞助商: 3.5不够聪明? 付费使用gpt4o</a>😎</div>
        <div mt-2 onClick={() => { setShow(show() ? 0 : 1) }}>
          {/*           <div op-60>听说支付宝又有大额红包<span class="border-1 px-2 py-1 mx-1 rounded-md transition-colors bg-slate/20 cursor-pointer hover:bg-slate/50">领取</span></div> */}
          <Show when={show() === 1}>
            <div my-4>
              <img class="w-4/5 mt-2 max-w-[300px]" src="/hongbao_l.jpg" />
            </div>
          </Show>
        </div>

        <Show when={info().is_show === 1}>
          <div op-60 mt-2>
            <div>
              gpt4o兑换码, <a class=" gpt-subtitle text-xs" href="https://gpt4f.ninvfeng.xyz">登录</a>兑换就能用
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

        <div mt-2><a href="https://claude.gptnb.xyz"><span class="op-60">👉</span> <span class=" gpt-subtitle text-xs">Claude 3.5 Sonnet</span></a></div>

      </div>
    </footer>
  )
}
