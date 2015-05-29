//
//  ViewController.m
//  WebViewLaunch
//
//  Created by zhengda on 15/5/25.
//  Copyright (c) 2015年 zhengda. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()<UIWebViewDelegate>

@property (nonatomic,retain) UIWebView *myWebView;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    
    //在html文件中图片的位置，记住千万不要设置成绝对路径。直接src＝"xxxx.png"就OK了，图片格式无所谓。
    self.myWebView = [[UIWebView alloc]initWithFrame:self.view.bounds];
    self.myWebView.delegate =self;
    NSString *filePath = [[NSBundle mainBundle]pathForResource:@"share_damuzhi_mobile" ofType:@"html"];
    NSString *htmlString = [NSString stringWithContentsOfFile:filePath encoding:NSUTF8StringEncoding error:nil];
    [self.myWebView loadHTMLString:htmlString baseURL:[NSURL URLWithString:filePath]];
    [self.view addSubview:self.myWebView];
}

#pragma mark –
- (BOOL)webView:(UIWebView *)webView shouldStartLoadWithRequest:(NSURLRequest *)request navigationType:(UIWebViewNavigationType)navigationType{
    NSString *urlString = [[request URL] absoluteString];
    urlString = [urlString stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    NSLog(@"urlString = %@", urlString);
    NSArray *urlComps = [urlString componentsSeparatedByString:@"/"];
    NSString * string = [urlComps lastObject];
    if ([string isEqualToString:@"QRCode.html"]) {
        NSLog(@"do someThing");
        [UIView animateWithDuration:1.0f animations:^{
            self.myWebView.alpha = 0.0f;
        }];
        [self.myWebView performSelector:@selector(removeFromSuperview) withObject:self.myWebView afterDelay:1.0f];
    }
    return YES;
}


- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
