// 在 types/feedback.ts 中定义接口

export interface ChatMessage {
    type: 'sent' | 'received'  // 消息类型：发送/接收
    content: string           // 消息内容
    timestamp: number        // 消息时间戳
    messageId: string        // 消息唯一ID
  }
  
  export interface ChatHistory {
    messages: Array<{
      role: 'user' | 'assistant' | 'system'  // 角色类型
      content: string                        // 内容
    }>
    sessionId: string                        // 会话ID
    userId: string                          // 用户ID
  }
  
  // 文心一言API相关接口
  export interface WenxinRequestParams {
    messages: Array<{
      role: 'user' | 'assistant' | 'system'
      content: string
    }>
    temperature?: number        // 温度参数，控制回答随机性
    top_p?: number             // 控制词的多样性
    penalty_score?: number     // 重复惩罚度
    stream?: boolean           // 是否流式响应
    system?: string            // 系统人设
    disable_search?: boolean   // 是否禁用搜索
    user_id?: string          // 用户ID
  }
  
  export interface WenxinResponse {
    id: string                // 对话id
    object: string            // 回包类型
    created: number          // 时间戳
    result: string           // 回复内容
    is_truncated: boolean    // 是否被截断
    need_clear_history: boolean  // 是否需要清理历史
    usage: {
      prompt_tokens: number   // 问题tokens
      completion_tokens: number // 回答tokens
      total_tokens: number     // 总tokens
    }
  }
  
  // 评价相关接口
  export interface FeedbackRating {
    sessionId: string         // 会话ID
    userId: string           // 用户ID
    rating: number           // 评分(1-5)
    timestamp: number        // 评价时间
    comment?: string         // 评价内容
  }
  
  // 客服配置接口
  export interface ServiceConfig {
    systemPrompt: string     // 系统提示语
    maxHistoryLength: number // 最大历史记录长度
    temperature: number      // 温度参数
    top_p: number           // 多样性参数
    accessToken?: string;  // 添加 accessToken 字段
  }
  
  // 添加新的接口
  export interface AccessTokenResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
  } 