import { MastraClient } from "@mastra/client-js";
import { EnglishResponse } from '../types/englishChat';

const client = new MastraClient({
  baseUrl: 'https://test-agents.zhangmoon778.workers.dev'
  // 'http://localhost:4111'
  // 'https://test-agents.zhangmoon778.workers.dev'
});

export const callEnglishAgent = async (scenario: string): Promise<EnglishResponse> => {
  console.log(scenario, 'scenario')
  try {
    const agent = client.getAgent("englishAgent");
    const message = `请给我一个关于${scenario}的日常英语对话示例，包含中文翻译`;
    const response = await agent.generate({
      messages: [{ role: "user", content: message }],
    });
    return response;
  } catch (error) {
    console.error("Error calling English Agent:", error);
    throw error;
  }
  // return {text: 'testaaaaaa'}
};

// export default client;
