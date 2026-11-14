# 工作流契约

项目根目录由用户指定，未指定沿用当前工作目录。所有路径相对项目根目录记录，交付时解析为绝对路径。

| 环节 | 读取 | 写出 | 可进入下游的条件 |
|---|---|---|---|
| 角色 | 描述与已有参考图 | characters.json、参考图 | 文字策划可使用draft设定；媒体制作需approved且参考图真实 |
| 剧本 | 角色、主题、历史 | story.md | 无对白、因果与时长核对 |
| 分镜 | 剧本、角色 | shots.json | 连续状态和时间范围齐备 |
| 关键帧 | 分镜、角色图 | image-prompts.md、images | 当镜图片视觉通过 |
| 视频 | 分镜、关键帧 | animation-prompts.md、clips | 动作审核通过、取用区间有效 |
| 声音 | 分镜、实际视频 | audio.json、音频文件 | 来源明确、实际动作卡点 |
| 剪辑 | 视频、声音、分镜 | MP4、工程或时间轴 | 读回参数并完整视听审核 |
| 合集 | 已审核单集与高光点 | 合集、封面、文案 | 全片与衔接检查 |

## 文字策划与媒体制作

用户只要求文字策划时，可将draft角色设定交给编剧和分镜，输出待审核的story.md与shots.json；不依赖参考图，不触发媒体生成。episode.status保持draft，reference_images为空数组，媒体路径及源视频取用区间为null。确认文字设定不等于确认完整角色资产。
进入关键帧或视频生成前，仍需角色资产approved、真实参考图与所需工具；按用户已有授权推进。不能用文字策划例外绕过媒体审核。

## 最小持久状态

episode.json保存episode_id、theme、target_duration_s、character_version、story_path、shots_path、audio_path、output_path、status；必要时附budget与retry_limit，未获授权不得填成已批准。
shots.json顶层episode_id、fps、target_duration_s、shots；以镜号关联图片、视频、声音。每镜status可为pending、generating、needs_review、approved、retry_needed；图片与视频分别记录image_status/video_status，避免图片通过就误判视频通过。分镜初建时status、image_status、video_status均为pending；image_status与video_status使用相同的五种状态。image_status由关键帧环节维护，video_status由视频环节维护。两者均approved且真实媒体及取用区间有效后，镜头status才可为approved；任一阶段需重做时status为retry_needed。文字分镜审核与媒体审核分开，不能仅因文字通过就把镜头status标为approved。
生成记录置于各镜generation数组：kind、model、task_id、status、attempt、output_path、actual_credits（无确证为null）。已提交先查状态再重试，不覆盖正在运行任务。
source_in_s和source_out_s属于源视频，start_s和duration_s属于成片，两者不得混用。duration_s包含freeze_s；需要变速、转场或复杂剪辑时明确时间映射，不能假设源长等于成片长。
audio.json的start_s为成片入点，source_in_s为音源取用起点。分镜修订后重新校准声音。
series-log.json逐集保存episode_id、status、theme、gags、antagonist、reused_assets、ending_hook、highlights、final_path；草稿与已完成集区分。

## 续跑边界

输入修改只让直接受影响的下游产物失效；不要删除已审核旧版。工具失败、质量失败、预算耗尽分别记录原因。没有真实媒体文件不能将角色资产或镜头媒体状态标为approved；文字草稿可以交接，但保持draft/pending。人工审核被明确要求时保留待审核状态；后续授权可覆盖相同范围，不机械重复确认。

## 来源与实现范围

依据用户修订后的《呱呱历险记复刻-完整创建手册（最终版）》制作。保留双主角、无对白、70秒竖屏、八环节与悬念连载方向；八类镜头与六类场景按剧情选用。手册统计缺原始证据时标为待核验。媒体生成和剪辑使用运行时真实可用工具及其技能；本套技能不捆绑凭据、不虚构API、不代替模型服务。
