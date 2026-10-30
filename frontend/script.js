// ========================================================
// CodeMorph - Frontend Converter Script
// Pure Light Theme • Live Line Numbering • Conversion Engine
// ========================================================

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements - Converter
    const sourceCode = document.getElementById('source-code');
    const targetCode = document.getElementById('target-code');
    const sourceGutter = document.getElementById('source-gutter');
    const targetGutter = document.getElementById('target-gutter');
    const sourceLang = document.getElementById('source-lang');
    const targetLang = document.getElementById('target-lang');
    const convertBtn = document.getElementById('convert-btn');
    const morphBtn = document.getElementById('morph-btn');
    const sampleBtn = document.getElementById('sample-btn');
    const clearBtn = document.getElementById('clear-btn');
    const copySourceBtn = document.getElementById('copy-source-btn');
    const copyTargetBtn = document.getElementById('copy-target-btn');
    const downloadBtn = document.getElementById('download-btn');
    const swapBtn = document.getElementById('swap-btn');
    const sourceStats = document.getElementById('source-stats');
    const targetStats = document.getElementById('target-stats');
    const conversionStatus = document.getElementById('conversion-status');
    const loadingOverlay = document.getElementById('loading-overlay');
    const toast = document.getElementById('toast');

    // Sidebar & Navigation feedback
    const navDashboard = document.getElementById('nav-dashboard');
    const navHistory = document.getElementById('nav-history');

    if (navDashboard) {
        navDashboard.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Dashboard analytics coming soon with backend integration!', 'info');
        });
    }

    if (navHistory) {
        navHistory.addEventListener('click', (e) => {
            e.preventDefault();
            showToast('Conversion history is active for your account.', 'info');
        });
    }

    // Load user info from localStorage if available
    const savedUser = JSON.parse(localStorage.getItem('codemorph_user') || 'null');
    if (savedUser) {
        const sidebarName = document.getElementById('sidebar-name');
        const sidebarEmail = document.getElementById('sidebar-email');
        const sidebarAvatar = document.getElementById('sidebar-avatar');
        if (sidebarName) sidebarName.textContent = savedUser.name;
        if (sidebarEmail) sidebarEmail.textContent = savedUser.email;
        if (sidebarAvatar) sidebarAvatar.textContent = savedUser.initials;
    }

    // Sample code templates for different languages
    const sampleCodes = {
        python: `# Python sample: Calculate Fibonacci numbers and filter evens
def fibonacci(n):
    fib_sequence = [0, 1]
    for i in range(2, n):
        next_val = fib_sequence[i - 1] + fib_sequence[i - 2]
        fib_sequence.append(next_val)
    return fib_sequence

def filter_even_numbers(numbers):
    evens = []
    for num in numbers:
        if num % 2 == 0:
            evens.append(num)
    return evens

# Main execution
limit = 10
fib_nums = fibonacci(limit)
even_fibs = filter_even_numbers(fib_nums)

print("Fibonacci Sequence:", fib_nums)
print("Even Fibonacci Numbers:", even_fibs)`,

        javascript: `// JavaScript sample: Calculate Fibonacci numbers and filter evens
function fibonacci(n) {
    const fibSequence = [0, 1];
    for (let i = 2; i < n; i++) {
        const nextVal = fibSequence[i - 1] + fibSequence[i - 2];
        fibSequence.push(nextVal);
    }
    return fibSequence;
}

function filterEvenNumbers(numbers) {
    const evens = [];
    for (const num of numbers) {
        if (num % 2 === 0) {
            evens.push(num);
        }
    }
    return evens;
}

// Main execution
const limit = 10;
const fibNums = fibonacci(limit);
const evenFibs = filterEvenNumbers(fibNums);

console.log("Fibonacci Sequence:", fibNums);
console.log("Even Fibonacci Numbers:", evenFibs);`,

        typescript: `// TypeScript sample: Calculate Fibonacci numbers and filter evens
function fibonacci(n: number): number[] {
    const fibSequence: number[] = [0, 1];
    for (let i = 2; i < n; i++) {
        const nextVal = fibSequence[i - 1] + fibSequence[i - 2];
        fibSequence.push(nextVal);
    }
    return fibSequence;
}

function filterEvenNumbers(numbers: number[]): number[] {
    return numbers.filter((num: number) => num % 2 === 0);
}

// Main execution
const limit: number = 10;
const fibNums: number[] = fibonacci(limit);
const evenFibs: number[] = filterEvenNumbers(fibNums);

console.log("Fibonacci Sequence:", fibNums);
console.log("Even Fibonacci Numbers:", evenFibs);`,

        java: `// Java sample: Calculate Fibonacci numbers and filter evens
import java.util.ArrayList;
import java.util.List;

public class FibonacciDemo {
    public static List<Integer> fibonacci(int n) {
        List<Integer> fibSequence = new ArrayList<>();
        fibSequence.add(0);
        fibSequence.add(1);
        for (int i = 2; i < n; i++) {
            int nextVal = fibSequence.get(i - 1) + fibSequence.get(i - 2);
            fibSequence.add(nextVal);
        }
        return fibSequence;
    }

    public static List<Integer> filterEvenNumbers(List<Integer> numbers) {
        List<Integer> evens = new ArrayList<>();
        for (int num : numbers) {
            if (num % 2 == 0) {
                evens.add(num);
            }
        }
        return evens;
    }

    public static void main(String[] args) {
        int limit = 10;
        List<Integer> fibNums = fibonacci(limit);
        List<Integer> evenFibs = filterEvenNumbers(fibNums);

        System.out.println("Fibonacci Sequence: " + fibNums);
        System.out.println("Even Fibonacci Numbers: " + evenFibs);
    }
}`,

        cpp: `// C++ sample: Calculate Fibonacci numbers and filter evens
#include <iostream>
#include <vector>

std::vector<int> fibonacci(int n) {
    std::vector<int> fibSequence = {0, 1};
    for (int i = 2; i < n; i++) {
        int nextVal = fibSequence[i - 1] + fibSequence[i - 2];
        fibSequence.push_back(nextVal);
    }
    return fibSequence;
}

std::vector<int> filterEvenNumbers(const std::vector<int>& numbers) {
    std::vector<int> evens;
    for (int num : numbers) {
        if (num % 2 == 0) {
            evens.push_back(num);
        }
    }
    return evens;
}

int main() {
    int limit = 10;
    std::vector<int> fibNums = fibonacci(limit);
    std::vector<int> evenFibs = filterEvenNumbers(fibNums);

    std::cout << "Fibonacci Sequence: ";
    for (int num : fibNums) std::cout << num << " ";
    std::cout << std::endl;

    return 0;
}`,

        csharp: `// C# sample: Calculate Fibonacci numbers and filter evens
using System;
using System.Collections.Generic;

class Program {
    static List<int> Fibonacci(int n) {
        var fibSequence = new List<int> { 0, 1 };
        for (int i = 2; i < n; i++) {
            int nextVal = fibSequence[i - 1] + fibSequence[i - 2];
            fibSequence.Add(nextVal);
        }
        return fibSequence;
    }

    static List<int> FilterEvenNumbers(List<int> numbers) {
        var evens = new List<int>();
        foreach (int num in numbers) {
            if (num % 2 == 0) {
                evens.Add(num);
            }
        }
        return evens;
    }

    static void Main() {
        int limit = 10;
        var fibNums = Fibonacci(limit);
        var evenFibs = FilterEvenNumbers(fibNums);

        Console.WriteLine("Fibonacci Sequence: " + string.Join(", ", fibNums));
        Console.WriteLine("Even Fibonacci Numbers: " + string.Join(", ", evenFibs));
    }
}`,

        go: `// Go sample: Calculate Fibonacci numbers and filter evens
package main

import "fmt"

func fibonacci(n int) []int {
    fibSequence := []int{0, 1}
    for i := 2; i < n; i++ {
        nextVal := fibSequence[i-1] + fibSequence[i-2]
        fibSequence = append(fibSequence, nextVal)
    }
    return fibSequence
}

func filterEvenNumbers(numbers []int) []int {
    var evens []int
    for _, num := range numbers {
        if num%2 == 0 {
            evens = append(evens, num)
        }
    }
    return evens;
}

func main() {
    limit := 10
    fibNums := fibonacci(limit)
    evenFibs := filterEvenNumbers(fibNums)

    fmt.Println("Fibonacci Sequence:", fibNums)
    fmt.Println("Even Fibonacci Numbers:", evenFibs)
}`,

        rust: `// Rust sample: Calculate Fibonacci numbers and filter evens
fn fibonacci(n: usize) -> Vec<i32> {
    let mut fib_sequence = vec![0, 1];
    for i in 2..n {
        let next_val = fib_sequence[i - 1] + fib_sequence[i - 2];
        fib_sequence.push(next_val);
    }
    fib_sequence
}

fn filter_even_numbers(numbers: &[i32]) -> Vec<i32> {
    numbers.iter().filter(|&&num| num % 2 == 0).copied().collect()
}

fn main() {
    let limit = 10;
    let fib_nums = fibonacci(limit);
    let even_fibs = filter_even_numbers(&fib_nums);

    println!("Fibonacci Sequence: {:?}", fib_nums);
    println!("Even Fibonacci Numbers: {:?}", even_fibs);
}`,

        php: `<?php
// PHP sample: Calculate Fibonacci numbers and filter evens
function fibonacci($n) {
    $fibSequence = [0, 1];
    for ($i = 2; $i < $n; $i++) {
        $nextVal = $fibSequence[$i - 1] + $fibSequence[$i - 2];
        $fibSequence[] = $nextVal;
    }
    return $fibSequence;
}

function filterEvenNumbers($numbers) {
    $evens = [];
    foreach ($numbers as $num) {
        if ($num % 2 === 0) {
            $evens[] = $num;
        }
    }
    return $evens;
}

$limit = 10;
$fibNums = fibonacci($limit);
$evenFibs = filterEvenNumbers($fibNums);

echo "Fibonacci Sequence: " . implode(", ", $fibNums) . "\n";
echo "Even Fibonacci Numbers: " . implode(", ", $evenFibs) . "\n";
?>`
    };

    const fileExtensions = {
        python: 'py',
        javascript: 'js',
        typescript: 'ts',
        java: 'java',
        cpp: 'cpp',
        csharp: 'cs',
        go: 'go',
        rust: 'rs',
        php: 'php'
    };

    // Helper: Update line numbers in the gutter
    function updateLineNumbers(textarea, gutter) {
        const lines = textarea.value.split('\n').length;
        let lineNumbersHTML = '';
        for (let i = 1; i <= lines; i++) {
            lineNumbersHTML += `<div>${i}</div>`;
        }
        gutter.innerHTML = lineNumbersHTML;
    }

    function updateStats(textarea, statsElement) {
        const text = textarea.value;
        const lineCount = text ? text.split('\n').length : 0;
        const charCount = text.length;
        statsElement.textContent = `Lines: ${lineCount} | Characters: ${charCount}`;
    }

    function syncScroll(textarea, gutter) {
        gutter.scrollTop = textarea.scrollTop;
    }

    function enableTabIndent(textarea) {
        textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const tabSpaces = '    ';

                textarea.value = textarea.value.substring(0, start) + tabSpaces + textarea.value.substring(end);
                textarea.selectionStart = textarea.selectionEnd = start + tabSpaces.length;

                updateLineNumbers(sourceCode, sourceGutter);
                updateStats(sourceCode, sourceStats);
            }
        });
    }

    let toastTimeout;
    function showToast(message, type = 'info') {
        clearTimeout(toastTimeout);
        toast.textContent = message;
        toast.className = `toast show ${type}`;
        toastTimeout = setTimeout(() => {
            toast.className = 'toast hidden';
        }, 3200);
    }

    function convertCode() {
        const code = sourceCode.value.trim();
        const fromLang = sourceLang.value;
        const toLang = targetLang.value;

        if (!code) {
            showToast('Please enter or paste code to convert.', 'warning');
            sourceCode.focus();
            return;
        }

        if (fromLang === toLang) {
            showToast('Source and Target languages are identical.', 'info');
            targetCode.value = code;
            updateLineNumbers(targetCode, targetGutter);
            updateStats(targetCode, targetStats);
            conversionStatus.textContent = 'Identical Lang';
            conversionStatus.className = 'status-pill status-ready';
            return;
        }

        loadingOverlay.classList.remove('hidden');
        conversionStatus.textContent = 'Converting...';
        conversionStatus.className = 'status-pill status-converting';
        convertBtn.disabled = true;

        setTimeout(() => {
            const converted = performMockTranspilation(code, fromLang, toLang);
            targetCode.value = converted;
            updateLineNumbers(targetCode, targetGutter);
            updateStats(targetCode, targetStats);

            loadingOverlay.classList.add('hidden');
            conversionStatus.textContent = `Converted to ${toLang.toUpperCase()}`;
            conversionStatus.className = 'status-pill status-converted';
            convertBtn.disabled = false;

            showToast(`Converted ${fromLang.toUpperCase()} to ${toLang.toUpperCase()}!`, 'success');
        }, 400);
    }

    function performMockTranspilation(inputCode, from, to) {
        if (sampleCodes[from] && inputCode.trim() === sampleCodes[from].trim()) {
            if (sampleCodes[to]) {
                return sampleCodes[to];
            }
        }

        const lines = inputCode.split('\n');
        const convertedLines = [];
        const dateStr = new Date().toLocaleDateString();

        convertedLines.push(`// ==========================================`);
        convertedLines.push(`// Converted from: ${from.toUpperCase()} to ${to.toUpperCase()}`);
        convertedLines.push(`// Generated via CodeMorph on ${dateStr}`);
        convertedLines.push(`// ==========================================`);
        convertedLines.push(``);

        if (to === 'java') {
            convertedLines.push(`import java.util.*;\n`);
            convertedLines.push(`public class ConvertedProgram {\n    public static void main(String[] args) {`);
        } else if (to === 'cpp') {
            convertedLines.push(`#include <iostream>\n#include <vector>\n#include <string>\n`);
            convertedLines.push(`int main() {`);
        } else if (to === 'csharp') {
            convertedLines.push(`using System;\nusing System.Collections.Generic;\n`);
            convertedLines.push(`class Program {\n    static void Main(string[] args) {`);
        } else if (to === 'go') {
            convertedLines.push(`package main\n\nimport "fmt"\n\nfunc main() {`);
        } else if (to === 'rust') {
            convertedLines.push(`fn main() {`);
        } else if (to === 'php') {
            convertedLines.push(`<?php`);
        }

        for (let line of lines) {
            let converted = line;

            if (from === 'python' && converted.trim().startsWith('#')) {
                converted = converted.replace('#', '//');
            } else if ((to === 'python') && converted.trim().startsWith('//')) {
                converted = converted.replace('//', '#');
            }

            if (to === 'javascript' || to === 'typescript') {
                converted = converted.replace(/\bprint\s*\((.*?)\)/g, 'console.log($1)');
                converted = converted.replace(/True\b/g, 'true');
                converted = converted.replace(/False\b/g, 'false');
                converted = converted.replace(/None\b/g, 'null');
            } else if (to === 'python') {
                converted = converted.replace(/\bconsole\.log\s*\((.*?)\);?/g, 'print($1)');
                converted = converted.replace(/\btrue\b/g, 'True');
                converted = converted.replace(/\bfalse\b/g, 'False');
                converted = converted.replace(/\bnull\b/g, 'None');
                converted = converted.replace(/\bconst\s+|\blet\s+|\bvar\s+/g, '');
                converted = converted.replace(/;$/g, '');
            } else if (to === 'java') {
                converted = converted.replace(/\bprint\s*\((.*?)\)/g, 'System.out.println($1);');
                converted = converted.replace(/\bconsole\.log\s*\((.*?)\);?/g, 'System.out.println($1);');
            } else if (to === 'cpp') {
                converted = converted.replace(/\bprint\s*\((.*?)\)/g, 'std::cout << $1 << std::endl;');
                converted = converted.replace(/\bconsole\.log\s*\((.*?)\);?/g, 'std::cout << $1 << std::endl;');
            } else if (to === 'go') {
                converted = converted.replace(/\bprint\s*\((.*?)\)/g, 'fmt.Println($1)');
            }

            if (from === 'python' && (to === 'javascript' || to === 'typescript')) {
                const defMatch = converted.match(/^(\s*)def\s+([a-zA-Z0-9_]+)\s*\((.*?)\)\s*:/);
                if (defMatch) {
                    converted = `${defMatch[1]}function ${defMatch[2]}(${defMatch[3]}) {`;
                }
            }

            if (['java', 'cpp', 'csharp', 'go', 'rust'].includes(to)) {
                converted = '        ' + converted;
            }

            convertedLines.push(converted);
        }

        if (to === 'java' || to === 'csharp') {
            convertedLines.push(`    }\n}`);
        } else if (to === 'cpp') {
            convertedLines.push(`    return 0;\n}`);
        } else if (to === 'go' || to === 'rust') {
            convertedLines.push(`}`);
        } else if (to === 'php') {
            convertedLines.push(`?>`);
        }

        return convertedLines.join('\n');
    }

    function loadSampleCode() {
        const lang = sourceLang.value;
        const sample = sampleCodes[lang] || sampleCodes['python'];
        sourceCode.value = sample;
        updateLineNumbers(sourceCode, sourceGutter);
        updateStats(sourceCode, sourceStats);
        showToast(`Loaded ${lang.toUpperCase()} sample code!`, 'info');
    }

    function copyText(text, successMsg) {
        if (!text.trim()) {
            showToast('Nothing to copy!', 'warning');
            return;
        }
        navigator.clipboard.writeText(text).then(() => {
            showToast(successMsg, 'success');
        }).catch(() => {
            const temp = document.createElement('textarea');
            temp.value = text;
            document.body.appendChild(temp);
            temp.select();
            document.execCommand('copy');
            document.body.removeChild(temp);
            showToast(successMsg, 'success');
        });
    }

    function downloadTargetCode() {
        const code = targetCode.value.trim();
        if (!code) {
            showToast('No converted code to download!', 'warning');
            return;
        }

        const lang = targetLang.value;
        const ext = fileExtensions[lang] || 'txt';
        const filename = `converted_code_${Date.now()}.${ext}`;

        const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        showToast(`Downloaded as ${filename}!`, 'success');
    }

    function swapLanguages() {
        const currentSource = sourceLang.value;
        const currentTarget = targetLang.value;

        sourceLang.value = currentTarget;
        targetLang.value = currentSource;

        if (targetCode.value.trim()) {
            const temp = sourceCode.value;
            sourceCode.value = targetCode.value;
            targetCode.value = temp;

            updateLineNumbers(sourceCode, sourceGutter);
            updateLineNumbers(targetCode, targetGutter);
            updateStats(sourceCode, sourceStats);
            updateStats(targetCode, targetStats);
        }

        showToast(`Swapped: ${currentTarget.toUpperCase()} ⇄ ${currentSource.toUpperCase()}`, 'info');
    }

    function clearEditor() {
        sourceCode.value = '';
        targetCode.value = '';
        updateLineNumbers(sourceCode, sourceGutter);
        updateLineNumbers(targetCode, targetGutter);
        updateStats(sourceCode, sourceStats);
        updateStats(targetCode, targetStats);
        conversionStatus.textContent = 'Waiting for Input';
        conversionStatus.className = 'status-pill status-ready';
        showToast('Editors cleared!', 'info');
    }

    // Event Listeners
    sourceCode.addEventListener('input', () => {
        updateLineNumbers(sourceCode, sourceGutter);
        updateStats(sourceCode, sourceStats);
    });

    targetCode.addEventListener('input', () => {
        updateLineNumbers(targetCode, targetGutter);
        updateStats(targetCode, targetStats);
    });

    sourceCode.addEventListener('scroll', () => syncScroll(sourceCode, sourceGutter));
    targetCode.addEventListener('scroll', () => syncScroll(targetCode, targetGutter));

    enableTabIndent(sourceCode);

    convertBtn.addEventListener('click', convertCode);
    morphBtn.addEventListener('click', convertCode);
    sampleBtn.addEventListener('click', loadSampleCode);
    clearBtn.addEventListener('click', clearEditor);
    swapBtn.addEventListener('click', swapLanguages);
    downloadBtn.addEventListener('click', downloadTargetCode);

    copySourceBtn.addEventListener('click', () => {
        copyText(sourceCode.value, 'Source code copied to clipboard!');
    });

    copyTargetBtn.addEventListener('click', () => {
        copyText(targetCode.value, 'Converted code copied to clipboard!');
    });

    sourceLang.addEventListener('change', () => {
        showToast(`Source language: ${sourceLang.value.toUpperCase()}`, 'info');
    });

    targetLang.addEventListener('change', () => {
        showToast(`Target language: ${targetLang.value.toUpperCase()}`, 'info');
    });

    // Initialize line numbers and stats
    updateLineNumbers(sourceCode, sourceGutter);
    updateLineNumbers(targetCode, targetGutter);
    updateStats(sourceCode, sourceStats);
    updateStats(targetCode, targetStats);
    loadSampleCode();
});
