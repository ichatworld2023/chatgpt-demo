import { Index, Show, createSignal, onMount } from 'solid-js'

interface InfoType { is_show: number, text: string, list: Array<any>, batch1: Array<any>, batch2: Array<any> }

export default () => {
  const [info, setInfo] = createSignal<InfoType>({ is_show: 1, text: '', list: [], batch1: [], batch2: [] })
  const [remain, setRemain] = createSignal(0)

  onMount(async() => {
    getInfo()
    getRemain()
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

  const getRemain = async() => {
    const response = await fetch('/api/getremain', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const responseJson = await response.json()
    if (responseJson.code === 200)
      setRemain(responseJson.data)
  }
  return (
    <footer>
      <div mt-6 text-xs class="block mobile:hidden">
        <div op-60>完全免费 无需登录 当日剩{ remain() }次</div>
        <div mt-4><span class="op-60">👉 </span><a class=" gpt-subtitle text-xs" href="https://gpt4f.ninvfeng.xyz">付费使用GPT4o</a></div>
      </div>
      <div mt-6 text-xs class="hidden mobile:block">

        <div op-60>完全免费 无需魔法 无需登录 当日剩{ remain() }次 模型: llama3 Gemini mistral</div>

        <div mt-2 op-60>收藏不迷路: <a class="gpt-subtitle text-xs" href="https://nav.free2gpt.com" target="_blank" rel="noreferrer">https://nav.free2gpt.com</a>🌟</div>
        <div mt-4><a class=" gpt-subtitle text-xs" href="https://gpt4f.ninvfeng.xyz">赞助商: 3.5不够聪明? 付费使用最新GPT4o<Show when={info().is_show === 1} >, 兑换码↓↓↓ </Show></a>😎</div>

        <Show when={info().is_show === 1}>
          <div op-60 mt-2>
            <div class="mt-1 flex flex-wrap text-xs">
              <span>仅限单次:&nbsp;</span>
              <Index each={info().batch1}>
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
            <div class="mt-1 flex flex-wrap text-xs">
              <span>每日可兑:&nbsp;</span>
              <Index each={info().batch2}>
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

        <div mt-4><a href="https://claude.gptnb.xyz"><span class="op-60">👉</span> <span class=" gpt-subtitle text-xs">Claude 3.5 Sonnet </span></a></div>
        <div mt-2><a href="https://o1-preview.gptnb.xyz"><span class="op-60">👉</span> <span class=" gpt-subtitle text-xs">o1-preview</span></a></div>

        {/*         <div mt-2 onClick={() => { copyAction('2:/⇥R06aMxvkldaJz⇤') }}>
          <div op-60>兄弟们, 拼多多帮我砍一刀</div>
          <div op-60 mt-1> 2:/⇥R06aMxvkldaJz⇤ </div>
          <div op-60 mt-1><span class="border-1 px-2 py-1 rounded-md transition-colors bg-slate/20 cursor-pointer hover:bg-slate/50">复制口令</span></div>
        </div>  */}

        {/*         <div mt-2 onClick={() => { setShow(show() ? 0 : 1) }}>
          <div op-60>点击可领支付宝大额红包<span class="border-1 px-2 py-1 mx-1 rounded-md transition-colors bg-slate/20 cursor-pointer hover:bg-slate/50">领取</span></div>
          <Show when={show() === 1}>
            <div my-4>
              <img class="w-4/5 mt-2 max-w-[300px]" src="/hongbao_f.jpg" />
            </div>
          </Show>
        </div>  */}

      </div>
    </footer>
  )
}
