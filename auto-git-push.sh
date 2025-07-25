#!/bin/zsh
# 自动 add、commit（带时间戳）、push

# 检查是否有更改
if ! git diff --cached --quiet || ! git diff --quiet; then
  git add .
  commit_msg="auto commit: $(date '+%Y-%m-%d %H:%M:%S')"
  git commit -m "$commit_msg"
  git push
else
  echo "没有需要提交的更改。"
fi 