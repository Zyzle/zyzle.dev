#!/bin/bash

echo "VERCEL_GIT_COMMIT_REF: $VERCEL_GIT_COMMIT_REF"

if [[ "$VERCEL_GIT_COMMIT_REF" == "master"  ]] ; then
  # Dont build master, we trigger it only with releases
  echo "🛑 - Master build, cancelled"
  exit 0;

else
  # Build everything else
	echo "✅ - Build can proceed"
  exit 1;
fi