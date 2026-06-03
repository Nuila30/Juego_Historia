export function applyChoiceEffects(currentStats, effect = {}) {
  const updatedStats = { ...currentStats };

  Object.entries(effect).forEach(([key, value]) => {
    updatedStats[key] = (updatedStats[key] || 0) + value;
  });

  if (updatedStats.vida > 100) {
    updatedStats.vida = 100;
  }

  if (updatedStats.vida < 0) {
    updatedStats.vida = 0;
  }

  return updatedStats;
}

export function addUniqueItems(currentItems = [], newItems = []) {
  return [...new Set([...currentItems, ...newItems])];
}

export function checkRequirements(choice, gameState, stats) {
  const requirements = choice.requirements;

  if (!requirements) {
    return {
      allowed: true,
      reason: "",
    };
  }

  if (requirements.minStats) {
    for (const [statName, requiredValue] of Object.entries(
      requirements.minStats
    )) {
      if ((stats[statName] || 0) < requiredValue) {
        return {
          allowed: false,
          reason: `Requiere ${statName}: ${requiredValue}`,
        };
      }
    }
  }

  if (requirements.items) {
    const hasItems = requirements.items.every((item) =>
      gameState.inventory.includes(item)
    );

    if (!hasItems) {
      return {
        allowed: false,
        reason: "Necesitas un objeto para esta acción.",
      };
    }
  }

  if (requirements.clues) {
    const hasClues = requirements.clues.every((clue) =>
      gameState.clues.includes(clue)
    );

    if (!hasClues) {
      return {
        allowed: false,
        reason: "Necesitas encontrar más pistas.",
      };
    }
  }

  if (requirements.flags) {
    for (const [flagName, flagValue] of Object.entries(requirements.flags)) {
      if (gameState.flags[flagName] !== flagValue) {
        return {
          allowed: false,
          reason: "Esta opción depende de una decisión anterior.",
        };
      }
    }
  }

  return {
    allowed: true,
    reason: "",
  };
}

export function applyGameStateChanges(currentGameState, choice) {
  return {
    inventory: addUniqueItems(currentGameState.inventory, choice.addItems || []),
    clues: addUniqueItems(currentGameState.clues, choice.addClues || []),
    flags: {
      ...currentGameState.flags,
      ...(choice.setFlags || {}),
    },
  };
}